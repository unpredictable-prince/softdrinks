from datetime import date
from decimal import Decimal
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.payment import Payment, PaymentAllocation
from app.models.sale import Sale
from app.schemas.payment import PaymentCreate
from app.services.sale_service import SaleService


class PaymentService:
    @staticmethod
    def _generate_payment_reference(db: Session) -> str:
        current_year = date.today().year
        prefix = f"PAY-{current_year}-"
        count = db.query(Payment).filter(Payment.payment_reference.like(f"{prefix}%")).count()
        return f"{prefix}{count + 1:04d}"

    @classmethod
    def record_payment(cls, db: Session, payment_in: PaymentCreate, user_id: Optional[int] = None) -> Payment:
        payment_reference = cls._generate_payment_reference(db)

        # Validate allocations if provided
        total_allocated = Decimal("0.00")
        db_allocations = []

        if payment_in.allocations:
            for alloc_in in payment_in.allocations:
                sale = db.query(Sale).filter(Sale.id == alloc_in.sale_id).first()
                if not sale:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Sale ID {alloc_in.sale_id} not found",
                    )
                if sale.status == "CANCELLED":
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Cannot allocate payment to cancelled sale #{sale.sale_number}",
                    )

                _, outstanding = SaleService.get_sale_balance_info(db, sale)
                if alloc_in.allocated_amount > outstanding:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Allocation amount ₹{alloc_in.allocated_amount} exceeds outstanding balance of ₹{outstanding} for sale #{sale.sale_number}",
                    )

                total_allocated += alloc_in.allocated_amount
                db_allocations.append(
                    PaymentAllocation(
                        sale_id=sale.id,
                        allocated_amount=alloc_in.allocated_amount,
                    )
                )

        if total_allocated > payment_in.amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Total allocated amount (₹{total_allocated}) cannot exceed the total payment amount (₹{payment_in.amount})",
            )

        payment = Payment(
            payment_reference=payment_reference,
            payment_method=payment_in.payment_method.upper(),
            amount=payment_in.amount,
            status="VERIFIED",
            transaction_reference=payment_in.transaction_reference,
            payment_date=payment_in.payment_date or date.today(),
            recorded_by=user_id,
            notes=payment_in.notes,
            allocations=db_allocations,
        )
        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment

    @staticmethod
    def verify_payment(db: Session, payment_id: int, new_status: str, user_id: Optional[int] = None) -> Payment:
        payment = db.query(Payment).filter(Payment.id == payment_id).first()
        if not payment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment record not found")

        valid_statuses = ("VERIFIED", "PENDING", "FAILED", "REFUNDED")
        if new_status.upper() not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid payment status. Must be one of {valid_statuses}",
            )

        payment.status = new_status.upper()
        db.commit()
        db.refresh(payment)
        return payment
