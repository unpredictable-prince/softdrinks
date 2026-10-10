from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    contact_name = Column(String(150), nullable=False)
    business_name = Column(String(200), nullable=True)
    phone = Column(String(30), nullable=False, index=True)
    email = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    enquiry_type = Column(String(50), nullable=False, default="RETAILER")  # RETAILER, DISTRIBUTOR, BULK_EVENT, OTHER
    estimated_demand = Column(String(100), nullable=True)
    message = Column(Text, nullable=True)
    source_channel = Column(String(50), nullable=False, default="WEBSITE")  # WEBSITE, WHATSAPP, INSTAGRAM, PHONE, FIELD
    status = Column(String(50), nullable=False, default="NEW")  # NEW, CONTACTED, QUALIFIED, CONVERTED, CLOSED, SPAM
    follow_up_at = Column(DateTime(timezone=True), nullable=True)
    assigned_user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    converted_customer_id = Column(Integer, ForeignKey("customers.id", ondelete="SET NULL"), nullable=True)
    converted_sale_id = Column(Integer, ForeignKey("sales.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    assigned_user = relationship("User", foreign_keys=[assigned_user_id])
    converted_customer = relationship("Customer", foreign_keys=[converted_customer_id])
    converted_sale = relationship("Sale", foreign_keys=[converted_sale_id])
