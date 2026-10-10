from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException, status

from app.models.sale import Sale, SaleItem
from app.models.product import ProductVariant, Product
from app.models.customer import Customer
from app.models.payment import Payment, PaymentAllocation
from app.models.inventory import InventoryLocation
from app.schemas.sale import SaleCreate, SaleResponse, SaleDetailResponse, PaymentAllocationDetail, SaleItemResponse
from app.services.inventory_service import InventoryService


class SaleService:
    @staticmethod
    def _generate_sale_number(db: Session) -> str:
        current_year = date.today().year
        prefix = f"INV-{current_year}-"
        count = db.query(Sale).filter(Sale.sale_number.like(f"{prefix}%")).count()
        return f"{prefix}{count + 1:04d}"

    @classmethod
    def create_sale(cls, db: Session, sale_in: SaleCreate, user_id: Optional[int] = None, default_location_id: Optional[int] = None) -> Sale:
        customer = db.query(Customer).filter(Customer.id == sale_in.customer_id).first()
        if not customer:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

        if not sale_in.items:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Sale must contain at least one product item")

        sale_number = cls._generate_sale_number(db)
        
        subtotal = Decimal("0.00")
        total_discount = Decimal("0.00")
        total_tax = Decimal("0.00")

        db_items: List[SaleItem] = []

        for item_in in sale_in.items:
            variant = (
                db.query(ProductVariant)
                .join(Product)
                .filter(ProductVariant.id == item_in.product_variant_id)
                .first()
            )
            if not variant:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Product variant ID {item_in.product_variant_id} not found",
                )

            line_subtotal = item_in.unit_price * item_in.quantity
            line_net = line_subtotal - item_in.discount_amount + item_in.tax_amount

            subtotal += line_subtotal
            total_discount += item_in.discount_amount
            total_tax += item_in.tax_amount

            db_item = SaleItem(
                product_variant_id=variant.id,
                product_name_snapshot=variant.product.name,
                variant_snapshot=variant.bottle_size,
                quantity=item_in.quantity,
                unit_price=item_in.unit_price,
                discount_amount=item_in.discount_amount,
                tax_amount=item_in.tax_amount,
                line_total=line_net,
                cost_price_snapshot=variant.cost_price,
            )
            db_items.append(db_item)

        total_amount = subtotal - total_discount + total_tax

        sale = Sale(
            sale_number=sale_number,
            customer_id=customer.id,
            sale_date=sale_in.sale_date or date.today(),
            source_channel=sale_in.source_channel,
            status=sale_in.status,
            subtotal=subtotal,
            discount_amount=total_discount,
            tax_amount=total_tax,
            total_amount=total_amount,
            notes=sale_in.notes,
            created_by=user_id,
            items=db_items,
        )
        db.add(sale)
        db.flush()

        # If sale is created directly as CONFIRMED or FULFILLED, deduct stock
        if sale.status in ("CONFIRMED", "FULFILLED"):
            loc_id = default_location_id
            if not loc_id:
                first_loc = db.query(InventoryLocation).filter(InventoryLocation.is_active == True).first()
                if not first_loc:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active warehouse location configured")
                loc_id = first_loc.id
            InventoryService.deduct_stock_for_sale(db=db, sale=sale, location_id=loc_id, user_id=user_id)

        db.commit()
        db.refresh(sale)
        return sale

    @classmethod
    def confirm_sale(cls, db: Session, sale_id: int, user_id: Optional[int] = None, location_id: Optional[int] = None) -> Sale:
        sale = db.query(Sale).filter(Sale.id == sale_id).first()
        if not sale:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sale not found")

        if sale.status == "CONFIRMED":
            return sale

        if sale.status == "CANCELLED":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot confirm a cancelled sale")

        loc_id = location_id
        if not loc_id:
            first_loc = db.query(InventoryLocation).filter(InventoryLocation.is_active == True).first()
            if not first_loc:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active warehouse location found")
            loc_id = first_loc.id

        InventoryService.deduct_stock_for_sale(db=db, sale=sale, location_id=loc_id, user_id=user_id)
        sale.status = "CONFIRMED"
        db.commit()
        db.refresh(sale)
        return sale

    @classmethod
    def cancel_sale(cls, db: Session, sale_id: int, user_id: Optional[int] = None, location_id: Optional[int] = None) -> Sale:
        sale = db.query(Sale).filter(Sale.id == sale_id).first()
        if not sale:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sale not found")

        if sale.status == "CANCELLED":
            return sale

        # If it was confirmed/fulfilled, reverse stock
        if sale.status in ("CONFIRMED", "FULFILLED"):
            loc_id = location_id
            if not loc_id:
                first_loc = db.query(InventoryLocation).filter(InventoryLocation.is_active == True).first()
                loc_id = first_loc.id if first_loc else 1
            InventoryService.reverse_stock_for_sale(db=db, sale=sale, location_id=loc_id, user_id=user_id)

        sale.status = "CANCELLED"
        db.commit()
        db.refresh(sale)
        return sale

    @classmethod
    def get_sale_balance_info(cls, db: Session, sale: Sale) -> Tuple[Decimal, Decimal]:
        """Calculates total verified payments allocated to this sale and remaining outstanding balance."""
        verified_allocations = (
            db.query(func.coalesce(func.sum(PaymentAllocation.allocated_amount), Decimal("0.00")))
            .join(Payment)
            .filter(
                PaymentAllocation.sale_id == sale.id,
                Payment.status == "VERIFIED",
            )
            .scalar()
        )
        total_paid = Decimal(verified_allocations or Decimal("0.00"))
        outstanding = max(Decimal("0.00"), sale.total_amount - total_paid)
        return total_paid, outstanding

    @classmethod
    def get_sale_detail(cls, db: Session, sale_id: int) -> SaleDetailResponse:
        sale = db.query(Sale).filter(Sale.id == sale_id).first()
        if not sale:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sale not found")

        total_paid, outstanding = cls.get_sale_balance_info(db, sale)

        allocations_data = []
        for alloc in sale.allocations:
            allocations_data.append(
                PaymentAllocationDetail(
                    id=alloc.id,
                    payment_id=alloc.payment_id,
                    payment_reference=alloc.payment.payment_reference,
                    payment_method=alloc.payment.payment_method,
                    payment_date=alloc.payment.payment_date,
                    allocated_amount=alloc.allocated_amount,
                    status=alloc.payment.status,
                )
            )

        items_data = [
            SaleItemResponse(
                id=item.id,
                product_variant_id=item.product_variant_id,
                product_name_snapshot=item.product_name_snapshot,
                variant_snapshot=item.variant_snapshot,
                quantity=item.quantity,
                unit_price=item.unit_price,
                discount_amount=item.discount_amount,
                tax_amount=item.tax_amount,
                line_total=item.line_total,
                cost_price_snapshot=item.cost_price_snapshot,
            )
            for item in sale.items
        ]

        return SaleDetailResponse(
            id=sale.id,
            sale_number=sale.sale_number,
            customer_id=sale.customer_id,
            customer_name=sale.customer.contact_name if sale.customer else None,
            customer_business=sale.customer.business_name if sale.customer else None,
            sale_date=sale.sale_date,
            source_channel=sale.source_channel,
            status=sale.status,
            subtotal=sale.subtotal,
            discount_amount=sale.discount_amount,
            tax_amount=sale.tax_amount,
            total_amount=sale.total_amount,
            total_paid=total_paid,
            outstanding_balance=outstanding,
            notes=sale.notes,
            created_at=sale.created_at,
            updated_at=sale.updated_at,
            items=items_data,
            allocations=allocations_data,
        )
