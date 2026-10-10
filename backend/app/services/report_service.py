import csv
import io
from decimal import Decimal
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, case

from app.models.sale import Sale, SaleItem
from app.models.payment import Payment, PaymentAllocation
from app.models.inventory import InventoryBalance, InventoryLocation
from app.models.product import ProductVariant, Product
from app.models.enquiry import Enquiry
from app.schemas.report import DashboardMetricsResponse, FlavourPerformance, ChannelMetric


class ReportService:
    @staticmethod
    def get_dashboard_metrics(db: Session) -> DashboardMetricsResponse:
        # Valid sales (CONFIRMED and FULFILLED)
        valid_sales = db.query(Sale).filter(Sale.status.in_(["CONFIRMED", "FULFILLED"])).all()

        gross_sales = sum((s.subtotal for s in valid_sales), Decimal("0.00"))
        discounts_given = sum((s.discount_amount for s in valid_sales), Decimal("0.00"))
        net_sales = sum((s.total_amount for s in valid_sales), Decimal("0.00"))

        # Payments verified received
        payments_received_total = (
            db.query(func.coalesce(func.sum(Payment.amount), Decimal("0.00")))
            .filter(Payment.status == "VERIFIED")
            .scalar()
        )
        payments_received = Decimal(payments_received_total or Decimal("0.00"))

        # Outstanding balances = net sales - verified payments allocated to those valid sales
        allocated_verified_total = (
            db.query(func.coalesce(func.sum(PaymentAllocation.allocated_amount), Decimal("0.00")))
            .join(Payment)
            .join(Sale)
            .filter(
                Payment.status == "VERIFIED",
                Sale.status.in_(["CONFIRMED", "FULFILLED"]),
            )
            .scalar()
        )
        allocated_verified = Decimal(allocated_verified_total or Decimal("0.00"))
        outstanding_balances = max(Decimal("0.00"), net_sales - allocated_verified)

        # Total units sold & Gross profit across valid sales
        valid_sale_ids = [s.id for s in valid_sales]
        total_units_sold = 0
        total_cogs = Decimal("0.00")
        if valid_sale_ids:
            items = db.query(SaleItem).filter(SaleItem.sale_id.in_(valid_sale_ids)).all()
            for it in items:
                total_units_sold += it.quantity
                total_cogs += it.cost_price_snapshot * it.quantity

        estimated_gross_profit = net_sales - total_cogs

        # Enquiries
        open_enquiries = db.query(Enquiry).filter(Enquiry.status.in_(["NEW", "CONTACTED", "QUALIFIED"])).count()
        converted_enquiries = db.query(Enquiry).filter(Enquiry.status == "CONVERTED").count()
        total_enquiries = db.query(Enquiry).count()
        conv_rate = (converted_enquiries / total_enquiries * 100.0) if total_enquiries > 0 else 0.0

        # Low stock items
        low_stock_count = (
            db.query(InventoryBalance)
            .join(ProductVariant)
            .filter(InventoryBalance.quantity_on_hand <= ProductVariant.reorder_threshold)
            .count()
        )

        # Flavour performance
        flavour_stats: List[FlavourPerformance] = []
        if valid_sale_ids:
            rows = (
                db.query(
                    Product.flavour,
                    func.sum(SaleItem.quantity).label("units"),
                    func.sum(SaleItem.line_total).label("revenue"),
                )
                .join(ProductVariant, ProductVariant.product_id == Product.id)
                .join(SaleItem, SaleItem.product_variant_id == ProductVariant.id)
                .filter(SaleItem.sale_id.in_(valid_sale_ids))
                .group_by(Product.flavour)
                .order_by(func.sum(SaleItem.quantity).desc())
                .limit(5)
                .all()
            )
            for r in rows:
                flavour_stats.append(
                    FlavourPerformance(
                        flavour=r[0],
                        units_sold=int(r[1] or 0),
                        gross_revenue=Decimal(r[2] or Decimal("0.00")),
                    )
                )

        # Sales by Channel
        channel_stats: List[ChannelMetric] = []
        channel_rows = (
            db.query(
                Sale.source_channel,
                func.count(Sale.id).label("count"),
                func.sum(Sale.total_amount).label("total"),
            )
            .filter(Sale.status.in_(["CONFIRMED", "FULFILLED"]))
            .group_by(Sale.source_channel)
            .all()
        )
        for cr in channel_rows:
            channel_stats.append(
                ChannelMetric(
                    channel=cr[0],
                    order_count=int(cr[1] or 0),
                    total_sales=Decimal(cr[2] or Decimal("0.00")),
                )
            )

        return DashboardMetricsResponse(
            gross_sales=gross_sales,
            discounts_given=discounts_given,
            net_sales=net_sales,
            payments_received=payments_received,
            outstanding_balances=outstanding_balances,
            total_units_sold=total_units_sold,
            estimated_gross_profit=estimated_gross_profit,
            open_enquiries_count=open_enquiries,
            converted_enquiries_count=converted_enquiries,
            conversion_rate_percentage=round(conv_rate, 2),
            low_stock_items_count=low_stock_count,
            top_flavours=flavour_stats,
            sales_by_channel=channel_stats,
        )

    @staticmethod
    def export_sales_csv(db: Session) -> str:
        sales = db.query(Sale).order_by(Sale.sale_date.desc()).all()
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow([
            "Invoice Number",
            "Sale Date",
            "Customer Name",
            "Channel",
            "Status",
            "Subtotal (INR)",
            "Discount (INR)",
            "Tax (INR)",
            "Total Amount (INR)",
            "Notes",
        ])
        for s in sales:
            writer.writerow([
                s.sale_number,
                s.sale_date.isoformat(),
                s.customer.contact_name if s.customer else "",
                s.source_channel,
                s.status,
                str(s.subtotal),
                str(s.discount_amount),
                str(s.tax_amount),
                str(s.total_amount),
                s.notes or "",
            ])
        return output.getvalue()

    @staticmethod
    def export_inventory_csv(db: Session) -> str:
        balances = (
            db.query(InventoryBalance)
            .join(ProductVariant)
            .join(Product)
            .join(InventoryLocation)
            .all()
        )
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow([
            "Warehouse Code",
            "Warehouse Name",
            "Product Name",
            "Flavour",
            "Bottle Size",
            "SKU",
            "Quantity On Hand",
            "Reorder Threshold",
            "Low Stock Status",
            "Last Updated",
        ])
        for b in balances:
            is_low = "YES" if b.quantity_on_hand <= b.variant.reorder_threshold else "NO"
            writer.writerow([
                b.location.code,
                b.location.name,
                b.variant.product.name,
                b.variant.product.flavour,
                b.variant.bottle_size,
                b.variant.sku,
                b.quantity_on_hand,
                b.variant.reorder_threshold,
                is_low,
                b.updated_at.isoformat(),
            ])
        return output.getvalue()
