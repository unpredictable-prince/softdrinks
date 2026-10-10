"""Seed database with initial super admin, warehouses, soft drink products and variants."""
from decimal import Decimal
from app.db.session import SessionLocal
from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User
from app.models.product import Product, ProductVariant
from app.models.inventory import InventoryLocation, InventoryBalance, InventoryMovement
from app.models.customer import Customer
from app.models.enquiry import Enquiry


def seed_database():
    db = SessionLocal()
    try:
        # 1. Super Admin
        admin = db.query(User).filter(User.email == settings.ADMIN_DEFAULT_EMAIL).first()
        if not admin:
            admin = User(
                name=settings.ADMIN_DEFAULT_NAME,
                email=settings.ADMIN_DEFAULT_EMAIL,
                password_hash=hash_password(settings.ADMIN_DEFAULT_PASSWORD),
                role="ADMIN",
                is_active=True,
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print(f"Created default admin user: {admin.email}")
        else:
            print(f"Admin user already exists: {admin.email}")

        # 2. Inventory Locations
        warehouse = db.query(InventoryLocation).filter(InventoryLocation.code == "CWH-AHM").first()
        if not warehouse:
            warehouse = InventoryLocation(
                name="Central Warehouse Ahmedabad",
                code="CWH-AHM",
                address="Plot 42, GIDC Industrial Estate, Naroda",
                city="Ahmedabad",
                is_active=True,
            )
            db.add(warehouse)
            db.commit()
            db.refresh(warehouse)
            print(f"Created primary warehouse: {warehouse.name}")

        # 3. Soft Drink Catalog
        sample_drinks = [
            {
                "name": "Jeera Masala Fizz",
                "slug": "jeera-masala-fizz",
                "flavour": "Roasted Jeera & Rock Salt",
                "is_featured": True,
                "description": "A signature Gujarat digestive cooler infused with roasted cumin, kala namak, crisp lemon notes, and high carbonation.",
                "image_url": "/images/drinks/jeera-masala.png",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-JMF-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.20"), "stock": 1200},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-JMF-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.10"), "stock": 800},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-JMF-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("26.50"), "stock": 350},
                ],
            },
            {
                "name": "Kachi Keri Spark",
                "slug": "kachi-keri-spark",
                "flavour": "Raw Mango & Mint",
                "is_featured": True,
                "description": "Zesty raw green mango with a hint of fresh garden mint, crafted to beat the scorching Gujarat heat.",
                "image_url": "/images/drinks/kachi-keri.png",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-KKS-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.20"), "stock": 1500},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-KKS-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.10"), "stock": 650},
                ],
            },
            {
                "name": "Lemon Lime Burst",
                "slug": "lemon-lime-burst",
                "flavour": "Sparkling Citrus Lemon",
                "is_featured": True,
                "description": "Ultra-crisp clear carbonated lemon-lime with electrifying fizz and pure mineral refreshment.",
                "image_url": "/images/drinks/lemon-lime.png",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-LLB-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.00"), "stock": 1000},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-LLB-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("12.80"), "stock": 500},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-LLB-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("25.80"), "stock": 300},
                ],
            },
            {
                "name": "Heritage Cola Classic",
                "slug": "heritage-cola-classic",
                "flavour": "Spiced Caramel Cola",
                "is_featured": True,
                "description": "Deep effervescent spiced caramel cola with cinnamon and clove undertones for an authentic Indian punch.",
                "image_url": "/images/drinks/heritage-cola.png",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-HCC-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.30"), "stock": 1400},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-HCC-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.20"), "stock": 700},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-HCC-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("26.80"), "stock": 400},
                ],
            },
            {
                "name": "Royal Orange Punch",
                "slug": "royal-orange-punch",
                "flavour": "Tangy Nagpur Orange",
                "is_featured": False,
                "description": "Sun-drenched citrus sweetness bursting with vivid effervescence and nostalgic soda fountain thrill.",
                "image_url": "/images/drinks/orange-punch.png",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-ROP-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.10"), "stock": 900},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-ROP-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("12.90"), "stock": 450},
                ],
            },
        ]

        for item in sample_drinks:
            prod = db.query(Product).filter(Product.slug == item["slug"]).first()
            if not prod:
                prod = Product(
                    name=item["name"],
                    slug=item["slug"],
                    flavour=item["flavour"],
                    description=item["description"],
                    image_url=item["image_url"],
                    is_featured=item["is_featured"],
                    status="PUBLISHED",
                )
                db.add(prod)
                db.commit()
                db.refresh(prod)
                print(f"Created product: {prod.name}")

                for v in item["variants"]:
                    variant = ProductVariant(
                        product_id=prod.id,
                        bottle_size=v["bottle_size"],
                        sku=v["sku"],
                        mrp=v["mrp"],
                        selling_price=v["selling_price"],
                        cost_price=v["cost_price"],
                        reorder_threshold=100,
                        is_active=True,
                    )
                    db.add(variant)
                    db.commit()
                    db.refresh(variant)

                    # Initial warehouse balance and movement record
                    bal = InventoryBalance(
                        location_id=warehouse.id,
                        product_variant_id=variant.id,
                        quantity_on_hand=v["stock"],
                        quantity_reserved=0,
                    )
                    db.add(bal)

                    movement = InventoryMovement(
                        location_id=warehouse.id,
                        product_variant_id=variant.id,
                        quantity_delta=v["stock"],
                        movement_type="RECEIPT",
                        reference_type="MANUAL_AUDIT",
                        reason="Initial factory bottling opening stock",
                        created_by=admin.id,
                    )
                    db.add(movement)
                    db.commit()

        # 4. Sample Retailers
        cust1 = db.query(Customer).filter(Customer.phone == "9898012345").first()
        if not cust1:
            cust1 = Customer(
                customer_type="RETAILER",
                business_name="Patel Provision & Cold Corner",
                contact_name="Bhavin Patel",
                phone="9898012345",
                email="patel.provision@example.com",
                gstin="24AAACP1234A1Z5",
                address="Shop 4, Sardar Complex, C.G. Road",
                city="Ahmedabad",
                state="Gujarat",
                notes="High demand for Jeera Masala and 200ml bottles.",
            )
            db.add(cust1)

        cust2 = db.query(Customer).filter(Customer.phone == "9825098765").first()
        if not cust2:
            cust2 = Customer(
                customer_type="DISTRIBUTOR",
                business_name="Shreeji Beverage Agency",
                contact_name="Jignesh Shah",
                phone="9825098765",
                email="shreeji.agency@example.com",
                gstin="24AABCS5678B1Z2",
                address="G-12, APMC Market, Maninagar",
                city="Ahmedabad",
                state="Gujarat",
                notes="Regional distributor covering East Ahmedabad.",
            )
            db.add(cust2)
        db.commit()

        # 5. Sample Initial Enquiry
        enquiry = db.query(Enquiry).filter(Enquiry.phone == "9879055443").first()
        if not enquiry:
            enquiry = Enquiry(
                contact_name="Maheshbhai Prajapati",
                business_name="Prajapati Kirana & Cold Drinks",
                phone="9879055443",
                email="mahesh.kirana@example.com",
                city="Vadodara",
                enquiry_type="RETAILER",
                estimated_demand="30-50 crates weekly",
                message="Interested in dealership for Vadodara Makarpura area. Please share price list and crate deposit terms.",
                source_channel="WEBSITE",
                status="NEW",
            )
            db.add(enquiry)
            db.commit()

        print("Database seeded successfully with initial data!")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
