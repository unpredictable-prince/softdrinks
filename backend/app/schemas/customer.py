from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class CustomerBase(BaseModel):
    customer_type: str = "RETAILER"  # RETAILER, DISTRIBUTOR, DIRECT_CONSUMER
    business_name: Optional[str] = None
    contact_name: str
    phone: str
    email: Optional[EmailStr] = None
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: str = "Ahmedabad"
    state: str = "Gujarat"
    notes: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    customer_type: Optional[str] = None
    business_name: Optional[str] = None
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    gstin: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    notes: Optional[str] = None


class CustomerResponse(CustomerBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class StockistPublicResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_name: Optional[str] = None
    contact_name: str
    phone: str
    address: Optional[str] = None
    city: str
    state: str

