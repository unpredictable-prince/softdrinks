from datetime import datetime, date
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class PaymentAllocationCreate(BaseModel):
    sale_id: int
    allocated_amount: Decimal = Field(..., gt=0)


class PaymentAllocationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    payment_id: int
    sale_id: int
    allocated_amount: Decimal
    created_at: datetime


class PaymentCreate(BaseModel):
    payment_method: str  # CASH, UPI, BANK_TRANSFER, CHEQUE
    amount: Decimal = Field(..., gt=0)
    transaction_reference: Optional[str] = None
    payment_date: Optional[date] = None
    notes: Optional[str] = None
    allocations: Optional[List[PaymentAllocationCreate]] = None


class PaymentVerifyRequest(BaseModel):
    status: str = "VERIFIED"  # VERIFIED, FAILED, REFUNDED


class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    payment_reference: str
    payment_method: str
    amount: Decimal
    status: str
    transaction_reference: Optional[str] = None
    payment_date: date
    recorded_by: Optional[int] = None
    notes: Optional[str] = None
    created_at: datetime
    allocations: List[PaymentAllocationResponse] = []

