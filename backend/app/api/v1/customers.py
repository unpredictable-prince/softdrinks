from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.customer import Customer
from app.models.user import User
from app.schemas.customer import CustomerCreate, CustomerUpdate, CustomerResponse, StockistPublicResponse
from app.api.deps import get_current_staff

router = APIRouter(prefix="/customers", tags=["Customers & Retailers"])


@router.get("", response_model=List[CustomerResponse])
def get_customers(
    customer_type: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    query = db.query(Customer)
    if customer_type:
        query = query.filter(Customer.customer_type == customer_type.upper())
    if city:
        query = query.filter(Customer.city.ilike(f"%{city}%"))
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Customer.contact_name.ilike(search_filter))
            | (Customer.business_name.ilike(search_filter))
            | (Customer.phone.ilike(search_filter))
        )
    return query.order_by(Customer.id.desc()).all()


@router.post("", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(
    customer_in: CustomerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    existing = db.query(Customer).filter(Customer.phone == customer_in.phone).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Customer with phone number {customer_in.phone} already exists",
        )

    customer = Customer(
        customer_type=customer_in.customer_type,
        business_name=customer_in.business_name,
        contact_name=customer_in.contact_name,
        phone=customer_in.phone,
        email=customer_in.email,
        gstin=customer_in.gstin,
        address=customer_in.address,
        city=customer_in.city,
        state=customer_in.state,
        notes=customer_in.notes,
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer


@router.get("/stockists/public", response_model=List[StockistPublicResponse])
def get_public_stockists(
    city: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Customer).filter(Customer.customer_type.in_(["RETAILER", "DISTRIBUTOR"]))
    if city and city.lower() != "all":
        query = query.filter(Customer.city.ilike(f"%{city}%"))
    return query.order_by(Customer.city.asc(), Customer.business_name.asc()).all()


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    return customer


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int,
    customer_in: CustomerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

    update_data = customer_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(customer, field, value)

    db.commit()
    db.refresh(customer)
    return customer
