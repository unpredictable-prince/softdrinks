from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.enquiry import (
    EnquiryCreate,
    EnquiryStatusUpdate,
    EnquiryResponse,
    EnquiryConvertRequest,
)
from app.schemas.customer import CustomerResponse
from app.services.enquiry_service import EnquiryService
from app.api.deps import get_current_staff

router = APIRouter(prefix="/enquiries", tags=["Enquiries & Leads"])


@router.post("", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
def submit_enquiry(enquiry_in: EnquiryCreate, db: Session = Depends(get_db)):
    """Public lead generation endpoint."""
    enquiry = EnquiryService.create_enquiry(db, enquiry_in)
    return enquiry


@router.get("", response_model=List[EnquiryResponse])
def get_enquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = db.query(Enquiry)
    if status_filter:
        query = query.filter(Enquiry.status == status_filter.upper())
    return query.order_by(Enquiry.created_at.desc()).all()


@router.patch("/{enquiry_id}/status", response_model=EnquiryResponse)
def update_enquiry_status(
    enquiry_id: int,
    status_in: EnquiryStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")

    enquiry.status = status_in.status.upper()
    if status_in.follow_up_at:
        enquiry.follow_up_at = status_in.follow_up_at
    if status_in.assigned_user_id:
        enquiry.assigned_user_id = status_in.assigned_user_id
    if status_in.notes:
        existing_notes = enquiry.message or ""
        enquiry.message = f"{existing_notes}\n[Note by {current_user.name}]: {status_in.notes}".strip()

    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.post("/{enquiry_id}/convert", response_model=CustomerResponse)
def convert_enquiry_to_customer(
    enquiry_id: int,
    convert_in: EnquiryConvertRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    customer = EnquiryService.convert_to_customer(
        db=db,
        enquiry_id=enquiry_id,
        convert_in=convert_in,
        user_id=current_user.id,
    )
    return customer
