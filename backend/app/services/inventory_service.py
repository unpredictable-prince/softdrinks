from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.inventory import InventoryLocation, InventoryBalance, InventoryMovement
from app.models.sale import Sale, SaleItem
from app.models.product import ProductVariant


class InventoryService:
    @staticmethod
    def adjust_stock(
        db: Session,
        location_id: int,
        product_variant_id: int,
        quantity_delta: int,
        movement_type: str,
        reason: str,
        user_id: Optional[int] = None,
        reference_type: Optional[str] = None,
        reference_id: Optional[int] = None,
    ) -> InventoryBalance:
        """Atomically adjust stock using row locking (SELECT FOR UPDATE)."""
        # Ensure location and variant exist
        location = db.query(InventoryLocation).filter(InventoryLocation.id == location_id).first()
        if not location:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory location not found")

        variant = db.query(ProductVariant).filter(ProductVariant.id == product_variant_id).first()
        if not variant:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product variant not found")

        balance = (
            db.query(InventoryBalance)
            .filter(
                InventoryBalance.location_id == location_id,
                InventoryBalance.product_variant_id == product_variant_id,
            )
            .with_for_update()
            .first()
        )

        if not balance:
            if quantity_delta < 0:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Cannot deduct stock. Zero initial inventory for variant {variant.sku}",
                )
            balance = InventoryBalance(
                location_id=location_id,
                product_variant_id=product_variant_id,
                quantity_on_hand=0,
                quantity_reserved=0,
            )
            db.add(balance)
            db.flush()

        new_quantity = balance.quantity_on_hand + quantity_delta
        if new_quantity < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient inventory for {variant.sku}. Current: {balance.quantity_on_hand}, Requested delta: {quantity_delta}",
            )

        balance.quantity_on_hand = new_quantity

        # Record movement
        movement = InventoryMovement(
            location_id=location_id,
            product_variant_id=product_variant_id,
            quantity_delta=quantity_delta,
            movement_type=movement_type,
            reference_type=reference_type,
            reference_id=reference_id,
            reason=reason,
            created_by=user_id,
        )
        db.add(movement)
        db.flush()
        return balance

    @classmethod
    def deduct_stock_for_sale(
        cls,
        db: Session,
        sale: Sale,
        location_id: int,
        user_id: Optional[int] = None,
    ) -> None:
        """Deduct stock for all items in a confirmed sale."""
        # Check if sale has already deducted stock to avoid duplicate deductions
        existing_movements = (
            db.query(InventoryMovement)
            .filter(
                InventoryMovement.reference_type == "SALE",
                InventoryMovement.reference_id == sale.id,
                InventoryMovement.movement_type == "SALE_DEDUCTION",
            )
            .first()
        )
        if existing_movements:
            # Already deducted
            return

        for item in sale.items:
            cls.adjust_stock(
                db=db,
                location_id=location_id,
                product_variant_id=item.product_variant_id,
                quantity_delta=-item.quantity,
                movement_type="SALE_DEDUCTION",
                reason=f"Sale fulfillment invoice #{sale.sale_number}",
                user_id=user_id,
                reference_type="SALE",
                reference_id=sale.id,
            )

    @classmethod
    def reverse_stock_for_sale(
        cls,
        db: Session,
        sale: Sale,
        location_id: int,
        user_id: Optional[int] = None,
        reason: str = "Sale cancellation reversal",
    ) -> None:
        """Reverses previously deducted stock if a confirmed sale is cancelled."""
        existing_deductions = (
            db.query(InventoryMovement)
            .filter(
                InventoryMovement.reference_type == "SALE",
                InventoryMovement.reference_id == sale.id,
                InventoryMovement.movement_type == "SALE_DEDUCTION",
            )
            .all()
        )
        if not existing_deductions:
            return  # No deduction was made (e.g. was draft)

        for item in sale.items:
            cls.adjust_stock(
                db=db,
                location_id=location_id,
                product_variant_id=item.product_variant_id,
                quantity_delta=item.quantity,
                movement_type="SALE_REVERSAL",
                reason=f"{reason} for invoice #{sale.sale_number}",
                user_id=user_id,
                reference_type="SALE",
                reference_id=sale.id,
            )
