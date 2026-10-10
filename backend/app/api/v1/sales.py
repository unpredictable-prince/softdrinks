from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.sale import Sale
from app.models.user import User
from app.schemas.sale import SaleCreate, SaleResponse, SaleDetailResponse
from app.services.sale_service import SaleService
from app.api.deps import get_current_staff

router = APIRouter(prefix="/sales", tags=["Sales & Invoicing"])


@router.get("", response_model=List[SaleResponse])
def get_sales(
    status_filter: Optional[str] = Query(None, alias="status"),
    customer_id: Optional[int] = Query(None),
    channel: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = db.query(Sale)
    if status_filter:
        query = query.filter(Sale.status == status_filter.upper())
    if customer_id:
        query = query.filter(Sale.customer_id == customer_id)
    if channel:
        query = query.filter(Sale.source_channel == channel.upper())

    sales = query.order_by(Sale.sale_date.desc(), Sale.id.desc()).all()
    results = []
    for s in sales:
        paid, outstanding = SaleService.get_sale_balance_info(db, s)
        results.append(
            SaleResponse(
                id=s.id,
                sale_number=s.sale_number,
                customer_id=s.customer_id,
                customer_name=s.customer.contact_name if s.customer else None,
                customer_business=s.customer.business_name if s.customer else None,
                sale_date=s.sale_date,
                source_channel=s.source_channel,
                status=s.status,
                subtotal=s.subtotal,
                discount_amount=s.discount_amount,
                tax_amount=s.tax_amount,
                total_amount=s.total_amount,
                total_paid=paid,
                outstanding_balance=outstanding,
                notes=s.notes,
                created_at=s.created_at,
                updated_at=s.updated_at,
            )
        )
    return results


@router.post("", response_model=SaleDetailResponse, status_code=status.HTTP_201_CREATED)
def create_sale(
    sale_in: SaleCreate,
    location_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    sale = SaleService.create_sale(
        db=db,
        sale_in=sale_in,
        user_id=current_user.id,
        default_location_id=location_id,
    )
    return SaleService.get_sale_detail(db, sale.id)


@router.get("/{sale_id}", response_model=SaleDetailResponse)
def get_sale_detail(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    return SaleService.get_sale_detail(db, sale_id)


@router.post("/{sale_id}/confirm", response_model=SaleDetailResponse)
def confirm_sale(
    sale_id: int,
    location_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    SaleService.confirm_sale(
        db=db,
        sale_id=sale_id,
        user_id=current_user.id,
        location_id=location_id,
    )
    return SaleService.get_sale_detail(db, sale_id)


@router.post("/{sale_id}/cancel", response_model=SaleDetailResponse)
def cancel_sale(
    sale_id: int,
    location_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    SaleService.cancel_sale(
        db=db,
        sale_id=sale_id,
        user_id=current_user.id,
        location_id=location_id,
    )
    return SaleService.get_sale_detail(db, sale_id)
