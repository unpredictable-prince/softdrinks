from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.schemas.report import DashboardMetricsResponse
from app.services.report_service import ReportService
from app.api.deps import get_current_staff

router = APIRouter(prefix="/reports", tags=["Reports & BI"])


@router.get("/dashboard", response_model=DashboardMetricsResponse)
def get_dashboard_metrics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    return ReportService.get_dashboard_metrics(db)


@router.get("/sales-csv")
def download_sales_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    csv_data = ReportService.export_sales_csv(db)
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=fizzora_sales_register.csv"},
    )


@router.get("/inventory-csv")
def download_inventory_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    csv_data = ReportService.export_inventory_csv(db)
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=fizzora_inventory_report.csv"},
    )
