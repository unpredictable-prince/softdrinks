from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.inventory import InventoryBalance, InventoryLocation, InventoryMovement
from app.models.product import ProductVariant, Product
from app.models.user import User
from app.schemas.inventory import (
    InventoryBalanceResponse,
    InventoryMovementCreate,
    InventoryMovementResponse,
    InventoryLocationResponse,
)
from app.services.inventory_service import InventoryService
from app.api.deps import get_current_staff, get_current_admin

router = APIRouter(prefix="/inventory", tags=["Inventory Management"])


@router.get("/locations", response_model=List[InventoryLocationResponse])
def get_inventory_locations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    return db.query(InventoryLocation).filter(InventoryLocation.is_active == True).all()


@router.get("/balances", response_model=List[InventoryBalanceResponse])
def get_inventory_balances(
    location_id: Optional[int] = Query(None),
    low_stock_only: Optional[bool] = Query(False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = (
        db.query(InventoryBalance)
        .join(InventoryLocation)
        .join(ProductVariant)
        .join(Product)
    )
    if location_id:
        query = query.filter(InventoryBalance.location_id == location_id)

    balances = query.order_by(Product.name.asc(), ProductVariant.bottle_size.asc()).all()
    results = []
    for b in balances:
        is_low = b.quantity_on_hand <= b.variant.reorder_threshold
        if low_stock_only and not is_low:
            continue
        results.append(
            InventoryBalanceResponse(
                id=b.id,
                location_id=b.location_id,
                location_name=b.location.name,
                product_variant_id=b.product_variant_id,
                product_name=b.variant.product.name,
                bottle_size=b.variant.bottle_size,
                sku=b.variant.sku,
                quantity_on_hand=b.quantity_on_hand,
                quantity_reserved=b.quantity_reserved,
                reorder_threshold=b.variant.reorder_threshold,
                is_low_stock=is_low,
                updated_at=b.updated_at,
            )
        )
    return results


@router.post("/adjust", response_model=InventoryBalanceResponse)
def adjust_inventory(
    movement_in: InventoryMovementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    balance = InventoryService.adjust_stock(
        db=db,
        location_id=movement_in.location_id,
        product_variant_id=movement_in.product_variant_id,
        quantity_delta=movement_in.quantity_delta,
        movement_type=movement_in.movement_type.upper(),
        reason=movement_in.reason,
        user_id=current_user.id,
    )
    db.commit()
    db.refresh(balance)

    is_low = balance.quantity_on_hand <= balance.variant.reorder_threshold
    return InventoryBalanceResponse(
        id=balance.id,
        location_id=balance.location_id,
        location_name=balance.location.name,
        product_variant_id=balance.product_variant_id,
        product_name=balance.variant.product.name,
        bottle_size=balance.variant.bottle_size,
        sku=balance.variant.sku,
        quantity_on_hand=balance.quantity_on_hand,
        quantity_reserved=balance.quantity_reserved,
        reorder_threshold=balance.variant.reorder_threshold,
        is_low_stock=is_low,
        updated_at=balance.updated_at,
    )


@router.get("/movements", response_model=List[InventoryMovementResponse])
def get_inventory_movements(
    location_id: Optional[int] = Query(None),
    variant_id: Optional[int] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = (
        db.query(InventoryMovement)
        .join(InventoryLocation)
        .join(ProductVariant)
        .join(Product)
    )
    if location_id:
        query = query.filter(InventoryMovement.location_id == location_id)
    if variant_id:
        query = query.filter(InventoryMovement.product_variant_id == variant_id)

    movements = query.order_by(InventoryMovement.created_at.desc()).limit(limit).all()
    results = []
    for m in movements:
        results.append(
            InventoryMovementResponse(
                id=m.id,
                location_id=m.location_id,
                location_name=m.location.name,
                product_variant_id=m.product_variant_id,
                product_name=m.variant.product.name,
                sku=m.variant.sku,
                quantity_delta=m.quantity_delta,
                movement_type=m.movement_type,
                reference_type=m.reference_type,
                reference_id=m.reference_id,
                reason=m.reason,
                created_by=m.created_by,
                created_at=m.created_at,
            )
        )
    return results
