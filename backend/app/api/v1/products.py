from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.product import Product, ProductVariant
from app.models.user import User
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductPublicResponse,
    ProductVariantCreate,
    ProductVariantUpdate,
    ProductVariantResponse,
)
from app.api.deps import get_current_admin, get_current_staff

router = APIRouter(prefix="/products", tags=["Products"])


# --- PUBLIC ENDPOINTS ---

@router.get("", response_model=List[ProductPublicResponse])
def get_public_products(
    featured: Optional[bool] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Product).filter(Product.status == "PUBLISHED")
    if featured is not None:
        query = query.filter(Product.is_featured == featured)
    if category:
        query = query.filter(Product.category == category.upper())
    products = query.order_by(Product.id.asc()).all()
    return products


@router.get("/detail/{slug}", response_model=ProductPublicResponse)
def get_public_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = (
        db.query(Product)
        .filter(Product.slug == slug, Product.status == "PUBLISHED")
        .first()
    )
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


# --- ADMIN ENDPOINTS ---

@router.get("/admin/all", response_model=List[ProductResponse])
def get_all_products_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_staff),
):
    products = db.query(Product).order_by(Product.id.asc()).all()
    return products


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    existing = db.query(Product).filter(Product.slug == product_in.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Product with slug '{product_in.slug}' already exists",
        )

    product = Product(
        name=product_in.name,
        slug=product_in.slug,
        category=product_in.category.upper() if product_in.category else "CARBONATED",
        flavour=product_in.flavour,
        description=product_in.description,
        image_url=product_in.image_url,
        is_featured=product_in.is_featured,
        status=product_in.status,
    )
    db.add(product)
    db.flush()

    if product_in.variants:
        for v in product_in.variants:
            variant = ProductVariant(
                product_id=product.id,
                bottle_size=v.bottle_size,
                sku=v.sku,
                mrp=v.mrp,
                selling_price=v.selling_price,
                cost_price=v.cost_price,
                reorder_threshold=v.reorder_threshold,
                is_active=v.is_active,
            )
            db.add(variant)

    db.commit()
    db.refresh(product)
    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product


@router.post("/{product_id}/variants", response_model=ProductVariantResponse, status_code=status.HTTP_201_CREATED)
def add_product_variant(
    product_id: int,
    variant_in: ProductVariantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    existing_sku = db.query(ProductVariant).filter(ProductVariant.sku == variant_in.sku).first()
    if existing_sku:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="SKU already exists")

    variant = ProductVariant(
        product_id=product.id,
        bottle_size=variant_in.bottle_size,
        sku=variant_in.sku,
        mrp=variant_in.mrp,
        selling_price=variant_in.selling_price,
        cost_price=variant_in.cost_price,
        reorder_threshold=variant_in.reorder_threshold,
        is_active=variant_in.is_active,
    )
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant


@router.put("/variants/{variant_id}", response_model=ProductVariantResponse)
def update_product_variant(
    variant_id: int,
    variant_in: ProductVariantUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    variant = db.query(ProductVariant).filter(ProductVariant.id == variant_id).first()
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant not found")

    update_data = variant_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(variant, field, value)

    db.commit()
    db.refresh(variant)
    return variant
