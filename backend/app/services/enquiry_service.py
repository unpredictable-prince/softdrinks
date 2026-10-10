from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.enquiry import Enquiry
from app.models.customer import Customer
from app.schemas.enquiry import EnquiryCreate, EnquiryConvertRequest


class EnquiryService:
    @staticmethod
    def create_enquiry(db: Session, enquiry_in: EnquiryCreate) -> Enquiry:
        enquiry = Enquiry(
            contact_name=enquiry_in.contact_name,
            business_name=enquiry_in.business_name,
            phone=enquiry_in.phone,
            email=enquiry_in.email,
            city=enquiry_in.city,
            enquiry_type=enquiry_in.enquiry_type,
            estimated_demand=enquiry_in.estimated_demand,
            message=enquiry_in.message,
            source_channel=enquiry_in.source_channel,
            status="NEW",
        )
        db.add(enquiry)
        db.commit()
        db.refresh(enquiry)
        return enquiry

    @staticmethod
    def convert_to_customer(
        db: Session,
        enquiry_id: int,
        convert_in: EnquiryConvertRequest,
        user_id: Optional[int] = None,
    ) -> Customer:
        enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
        if not enquiry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enquiry not found")

        # Check if customer with this phone number already exists
        existing_customer = db.query(Customer).filter(Customer.phone == enquiry.phone).first()
        if existing_customer:
            enquiry.converted_customer_id = existing_customer.id
            enquiry.status = "CONVERTED"
            db.commit()
            db.refresh(existing_customer)
            return existing_customer

        # Create new customer
        customer = Customer(
            customer_type=convert_in.customer_type,
            business_name=enquiry.business_name or enquiry.contact_name,
            contact_name=enquiry.contact_name,
            phone=enquiry.phone,
            email=enquiry.email,
            gstin=convert_in.gstin,
            address=convert_in.address,
            city=enquiry.city,
            state="Gujarat",
            notes=f"Converted from lead #{enquiry.id}. Original demand: {enquiry.estimated_demand or 'N/A'}",
        )
        db.add(customer)
        db.flush()

        enquiry.converted_customer_id = customer.id
        enquiry.status = "CONVERTED"
        db.commit()
        db.refresh(customer)
        return customer
