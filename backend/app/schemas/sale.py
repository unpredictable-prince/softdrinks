from datetime import datetime, date
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class SaleItemCreate(BaseModel):
    product_variant_id: int
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., gt=0)
    discount_amount: Decimal = Field(Decimal("0.00"), ge=0)
    tax_amount: Decimal = Field(Decimal("0.00"), ge=0)


class SaleItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_variant_id: int
    product_name_snapshot: str
    variant_snapshot: str
    quantity: int
    unit_price: Decimal
    discount_amount: Decimal
    tax_amount: Decimal
    line_total: Decimal
    cost_price_snapshot: Decimal


class SaleCreate(BaseModel):
    customer_id: int
    sale_date: Optional[date] = None
    source_channel: str = "DIRECT"  # WEBSITE_ENQUIRY, WHATSAPP, FIELD_VISIT, PHONE, DIRECT
    status: str = "DRAFT"  # DRAFT, CONFIRMED, FULFILLED, CANCELLED
    notes: Optional[str] = None
    items: List[SaleItemCreate]


class SaleUpdate(BaseModel):
    notes: Optional[str] = None
    status: Optional[str] = None


class SaleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sale_number: str
    customer_id: int
    customer_name: Optional[str] = None
    customer_business: Optional[str] = None
    sale_date: date
    source_channel: str
    status: str
    subtotal: Decimal
    discount_amount: Decimal
    tax_amount: Decimal
    total_amount: Decimal
    total_paid: Decimal = Decimal("0.00")
    outstanding_balance: Decimal = Decimal("0.00")
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime



class PaymentAllocationDetail(BaseModel):
    id: int
    payment_id: int
    payment_reference: str
    payment_method: str
    payment_date: date
    allocated_amount: Decimal
    status: str


class SaleDetailResponse(SaleResponse):
    items: List[SaleItemResponse] = []
    allocations: List[PaymentAllocationDetail] = []
