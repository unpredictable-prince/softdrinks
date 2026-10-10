from decimal import Decimal
from typing import Dict, List, Optional
from pydantic import BaseModel


class FlavourPerformance(BaseModel):
    flavour: str
    units_sold: int
    gross_revenue: Decimal


class ChannelMetric(BaseModel):
    channel: str
    order_count: int
    total_sales: Decimal


class DashboardMetricsResponse(BaseModel):
    gross_sales: Decimal
    discounts_given: Decimal
    net_sales: Decimal
    payments_received: Decimal
    outstanding_balances: Decimal
    total_units_sold: int
    estimated_gross_profit: Decimal
    open_enquiries_count: int
    converted_enquiries_count: int
    conversion_rate_percentage: float
    low_stock_items_count: int
    top_flavours: List[FlavourPerformance] = []
    sales_by_channel: List[ChannelMetric] = []
