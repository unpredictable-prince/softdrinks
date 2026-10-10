from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class ProductVariantBase(BaseModel):
    bottle_size: str
    sku: str
    mrp: Decimal = Field(..., gt=0)
    selling_price: Decimal = Field(..., gt=0)
    cost_price: Decimal = Field(..., ge=0)
    reorder_threshold: int = Field(50, ge=0)
    is_active: bool = True


class ProductVariantCreate(ProductVariantBase):
    pass


class ProductVariantUpdate(BaseModel):
    bottle_size: Optional[str] = None
    sku: Optional[str] = None
    mrp: Optional[Decimal] = None
    selling_price: Optional[Decimal] = None
    cost_price: Optional[Decimal] = None
    reorder_threshold: Optional[int] = None
    is_active: Optional[bool] = None


class ProductVariantResponse(ProductVariantBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    created_at: datetime


class ProductBase(BaseModel):
    name: str
    slug: str
    category: str = "CARBONATED"
    flavour: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = False
    status: str = "PUBLISHED"


class ProductCreate(ProductBase):
    variants: Optional[List[ProductVariantCreate]] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    flavour: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None


class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    variants: List[ProductVariantResponse] = []


# Public representation that hides cost_price
class ProductVariantPublicResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    bottle_size: str
    sku: str
    mrp: Decimal
    selling_price: Decimal
    is_active: bool


class ProductPublicResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    category: str = "CARBONATED"
    flavour: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool
    status: str
    variants: List[ProductVariantPublicResponse] = []

