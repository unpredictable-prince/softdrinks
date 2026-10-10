from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.session import Base


class InventoryLocation(Base):
    __tablename__ = "inventory_locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=False, default="Ahmedabad")
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    balances = relationship("InventoryBalance", back_populates="location")


class InventoryBalance(Base):
    __tablename__ = "inventory_balances"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("inventory_locations.id", ondelete="RESTRICT"), nullable=False, index=True)
    product_variant_id = Column(Integer, ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False, index=True)
    quantity_on_hand = Column(Integer, nullable=False, default=0)
    quantity_reserved = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    location = relationship("InventoryLocation", back_populates="balances")
    variant = relationship("ProductVariant", back_populates="balances")

    __table_args__ = (
        UniqueConstraint("location_id", "product_variant_id", name="uq_location_variant"),
    )


class InventoryMovement(Base):
    __tablename__ = "inventory_movements"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("inventory_locations.id", ondelete="RESTRICT"), nullable=False, index=True)
    product_variant_id = Column(Integer, ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False, index=True)
    quantity_delta = Column(Integer, nullable=False)
    movement_type = Column(String(50), nullable=False)  # RECEIPT, SALE_DEDUCTION, SALE_REVERSAL, DAMAGE, EXPIRY, ADJUSTMENT, TRANSFER
    reference_type = Column(String(50), nullable=True)  # SALE, PURCHASE, MANUAL_AUDIT
    reference_id = Column(Integer, nullable=True)
    reason = Column(Text, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    location = relationship("InventoryLocation")
    variant = relationship("ProductVariant")
    creator = relationship("User")
