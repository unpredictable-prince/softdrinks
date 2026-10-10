from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.payment import Payment
from app.models.user import User
from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    PaymentVerifyRequest,
    PaymentAllocationResponse,
)
from app.services.payment_service import PaymentService
from app.api.deps import get_current_staff, get_current_admin

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.get("", response_model=List[PaymentResponse])
def get_payments(
    status_filter: Optional[str] = Query(None, alias="status"),
    method: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = db.query(Payment)
    if status_filter:
        query = query.filter(Payment.status == status_filter.upper())
    if method:
        query = query.filter(Payment.payment_method == method.upper())

    payments = query.order_by(Payment.payment_date.desc(), Payment.id.desc()).all()
    results = []
    for p in payments:
        alloc_resps = [
            PaymentAllocationResponse(
                id=a.id,
                payment_id=a.payment_id,
                sale_id=a.sale_id,
                allocated_amount=a.allocated_amount,
                created_at=a.created_at,
            )
            for a in p.allocations
        ]
        results.append(
            PaymentResponse(
                id=p.id,
                payment_reference=p.payment_reference,
                payment_method=p.payment_method,
                amount=p.amount,
                status=p.status,
                transaction_reference=p.transaction_reference,
                payment_date=p.payment_date,
                recorded_by=p.recorded_by,
                notes=p.notes,
                created_at=p.created_at,
                allocations=alloc_resps,
            )
        )
    return results


@router.post("", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def record_payment(
    payment_in: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    payment = PaymentService.record_payment(
        db=db,
        payment_in=payment_in,
        user_id=current_user.id,
    )
    alloc_resps = [
        PaymentAllocationResponse(
            id=a.id,
            payment_id=a.payment_id,
            sale_id=a.sale_id,
            allocated_amount=a.allocated_amount,
            created_at=a.created_at,
        )
        for a in payment.allocations
    ]
    return PaymentResponse(
        id=payment.id,
        payment_reference=payment.payment_reference,
        payment_method=payment.payment_method,
        amount=payment.amount,
        status=payment.status,
        transaction_reference=payment.transaction_reference,
        payment_date=payment.payment_date,
        recorded_by=payment.recorded_by,
        notes=payment.notes,
        created_at=payment.created_at,
        allocations=alloc_resps,
    )


@router.patch("/{payment_id}/verify", response_model=PaymentResponse)
def verify_payment(
    payment_id: int,
    verify_in: PaymentVerifyRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    payment = PaymentService.verify_payment(
        db=db,
        payment_id=payment_id,
        new_status=verify_in.status,
        user_id=current_user.id,
    )
    alloc_resps = [
        PaymentAllocationResponse(
            id=a.id,
            payment_id=a.payment_id,
            sale_id=a.sale_id,
            allocated_amount=a.allocated_amount,
            created_at=a.created_at,
        )
        for a in payment.allocations
    ]
    return PaymentResponse(
        id=payment.id,
        payment_reference=payment.payment_reference,
        payment_method=payment.payment_method,
        amount=payment.amount,
        status=payment.status,
        transaction_reference=payment.transaction_reference,
        payment_date=payment.payment_date,
        recorded_by=payment.recorded_by,
        notes=payment.notes,
        created_at=payment.created_at,
        allocations=alloc_resps,
    )
