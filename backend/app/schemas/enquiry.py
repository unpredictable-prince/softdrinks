from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class EnquiryCreate(BaseModel):
    contact_name: str
    business_name: Optional[str] = None
    phone: str
    email: Optional[EmailStr] = None
    city: str
    enquiry_type: str = "RETAILER"  # RETAILER, DISTRIBUTOR, BULK_EVENT, OTHER
    estimated_demand: Optional[str] = None
    message: Optional[str] = None
    source_channel: str = "WEBSITE"


class EnquiryStatusUpdate(BaseModel):
    status: str  # NEW, CONTACTED, QUALIFIED, CONVERTED, CLOSED, SPAM
    follow_up_at: Optional[datetime] = None
    assigned_user_id: Optional[int] = None
    notes: Optional[str] = None


class EnquiryConvertRequest(BaseModel):
    customer_type: str = "RETAILER"
    gstin: Optional[str] = None
    address: Optional[str] = None


class EnquiryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    contact_name: str
    business_name: Optional[str] = None
    phone: str
    email: Optional[str] = None
    city: str
    enquiry_type: str
    estimated_demand: Optional[str] = None
    message: Optional[str] = None
    source_channel: str
    status: str
    follow_up_at: Optional[datetime] = None
    assigned_user_id: Optional[int] = None
    converted_customer_id: Optional[int] = None
    converted_sale_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

