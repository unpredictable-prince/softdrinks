from datetime import datetime, date, timezone
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    sale_number = Column(String(50), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="RESTRICT"), nullable=False, index=True)
    sale_date = Column(Date, nullable=False, default=date.today)
    source_channel = Column(String(50), nullable=False, default="DIRECT")  # WEBSITE_ENQUIRY, WHATSAPP, FIELD_VISIT, PHONE, DIRECT
    status = Column(String(50), nullable=False, default="DRAFT")  # DRAFT, CONFIRMED, FULFILLED, CANCELLED
    subtotal = Column(Numeric(12, 2), nullable=False, default=0.00)
    discount_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    tax_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    total_amount = Column(Numeric(12, 2), nullable=False, default=0.00)
    notes = Column(Text, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    customer = relationship("Customer", back_populates="sales")
    creator = relationship("User", foreign_keys=[created_by])
    items = relationship("SaleItem", back_populates="sale", cascade="all, delete-orphan")
    allocations = relationship("PaymentAllocation", back_populates="sale", cascade="all, delete-orphan")


class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id", ondelete="CASCADE"), nullable=False, index=True)
    product_variant_id = Column(Integer, ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False)
    product_name_snapshot = Column(String(150), nullable=False)
    variant_snapshot = Column(String(100), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    discount_amount = Column(Numeric(10, 2), nullable=False, default=0.00)
    tax_amount = Column(Numeric(10, 2), nullable=False, default=0.00)
    line_total = Column(Numeric(12, 2), nullable=False)
    cost_price_snapshot = Column(Numeric(10, 2), nullable=False)

    sale = relationship("Sale", back_populates="items")
    variant = relationship("ProductVariant")
