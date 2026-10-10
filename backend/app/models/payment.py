from datetime import datetime, date, timezone
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Numeric, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.session import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    payment_reference = Column(String(100), unique=True, index=True, nullable=False)
    payment_method = Column(String(50), nullable=False)  # CASH, UPI, BANK_TRANSFER, CHEQUE
    amount = Column(Numeric(12, 2), nullable=False)
    status = Column(String(50), nullable=False, default="VERIFIED")  # PENDING, VERIFIED, FAILED, REFUNDED
    transaction_reference = Column(String(150), nullable=True)  # UPI UTR, Cheque No, Bank Ref
    payment_date = Column(Date, nullable=False, default=date.today)
    recorded_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    recorder = relationship("User", foreign_keys=[recorded_by])
    allocations = relationship("PaymentAllocation", back_populates="payment", cascade="all, delete-orphan")


class PaymentAllocation(Base):
    __tablename__ = "payment_allocations"

    id = Column(Integer, primary_key=True, index=True)
    payment_id = Column(Integer, ForeignKey("payments.id", ondelete="CASCADE"), nullable=False, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="RESTRICT"), nullable=False, index=True)
    allocated_amount = Column(Numeric(12, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    payment = relationship("Payment", back_populates="allocations")
    sale = relationship("Sale", back_populates="allocations")

    __table_args__ = (
        UniqueConstraint("payment_id", "sale_id", name="uq_payment_sale"),
    )
