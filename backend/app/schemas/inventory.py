from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class InventoryLocationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    code: str
    address: Optional[str] = None
    city: str
    is_active: bool


class InventoryBalanceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    location_id: int
    location_name: Optional[str] = None
    product_variant_id: int
    product_name: Optional[str] = None
    bottle_size: Optional[str] = None
    sku: Optional[str] = None
    quantity_on_hand: int
    quantity_reserved: int
    reorder_threshold: int = 50
    is_low_stock: bool = False
    updated_at: datetime


class InventoryMovementCreate(BaseModel):
    location_id: int
    product_variant_id: int
    quantity_delta: int
    movement_type: str  # RECEIPT, DAMAGE, EXPIRY, ADJUSTMENT, TRANSFER
    reason: str


class InventoryMovementResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    location_id: int
    location_name: Optional[str] = None
    product_variant_id: int
    product_name: Optional[str] = None
    sku: Optional[str] = None
    quantity_delta: int
    movement_type: str
    reference_type: Optional[str] = None
    reference_id: Optional[int] = None
    reason: str
    created_by: Optional[int] = None
    created_at: datetime

