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

        # 3. Soft Drink & Dairy Catalog
        sample_drinks = [
            {
                "name": "Jeera Masala Fizz",
                "slug": "jeera-masala-fizz",
                "category": "CARBONATED",
                "flavour": "Roasted Jeera & Rock Salt",
                "is_featured": True,
                "description": "A signature Gujarat digestive cooler infused with roasted cumin, kala namak, crisp lemon notes, and high carbonation.",
                "image_url": "/images/drinks/jeera-masala.svg",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-JMF-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.20"), "stock": 1200},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-JMF-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.10"), "stock": 800},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-JMF-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("26.50"), "stock": 350},
                ],
            },
            {
                "name": "Kachi Keri Spark",
                "slug": "kachi-keri-spark",
                "category": "CARBONATED",
                "flavour": "Raw Mango & Mint",
                "is_featured": True,
                "description": "Zesty raw green mango with a hint of fresh garden mint, crafted to beat the scorching Gujarat heat.",
                "image_url": "/images/drinks/kachi-keri.svg",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-KKS-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.20"), "stock": 1500},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-KKS-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.10"), "stock": 650},
                ],
            },
            {
                "name": "Lemon Lime Burst",
                "slug": "lemon-lime-burst",
                "category": "CARBONATED",
                "flavour": "Sparkling Citrus Lemon",
                "is_featured": True,
                "description": "Ultra-crisp clear carbonated lemon-lime with electrifying fizz and pure mineral refreshment.",
                "image_url": "/images/drinks/lemon-lime.svg",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-LLB-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.00"), "stock": 1000},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-LLB-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("12.80"), "stock": 500},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-LLB-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("25.80"), "stock": 300},
                ],
            },
            {
                "name": "Heritage Cola Classic",
                "slug": "heritage-cola-classic",
                "category": "CARBONATED",
                "flavour": "Spiced Caramel Cola",
                "is_featured": True,
                "description": "Deep effervescent spiced caramel cola with cinnamon and clove undertones for an authentic Indian punch.",
                "image_url": "/images/drinks/heritage-cola.svg",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-HCC-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.30"), "stock": 1400},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-HCC-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("13.20"), "stock": 700},
                    {"bottle_size": "1.25L Party Pack", "sku": "FIZZ-HCC-1250", "mrp": Decimal("50.00"), "selling_price": Decimal("39.00"), "cost_price": Decimal("26.80"), "stock": 400},
                ],
            },
            {
                "name": "Royal Orange Punch",
                "slug": "royal-orange-punch",
                "category": "CARBONATED",
                "flavour": "Tangy Nagpur Orange",
                "is_featured": False,
                "description": "Sun-drenched citrus sweetness bursting with vivid effervescence and nostalgic soda fountain thrill.",
                "image_url": "/images/drinks/orange-punch.svg",
                "variants": [
                    {"bottle_size": "200ml Glass/PET", "sku": "FIZZ-ROP-200", "mrp": Decimal("12.00"), "selling_price": Decimal("9.50"), "cost_price": Decimal("6.10"), "stock": 900},
                    {"bottle_size": "500ml PET", "sku": "FIZZ-ROP-500", "mrp": Decimal("25.00"), "selling_price": Decimal("19.50"), "cost_price": Decimal("12.90"), "stock": 450},
                ],
            },
            {
                "name": "Desi Masala Chaas",
                "slug": "desi-masala-chaas",
                "category": "DAIRY",
                "flavour": "Slow-Churned Hing & Roasted Jeera",
                "is_featured": True,
                "description": "Traditional Gujarat spiced buttermilk churned from fresh curd, blended with roasted cumin, green chillies, rock salt, and fresh coriander.",
                "image_url": "/images/drinks/masala-chaas.svg",
                "variants": [
                    {"bottle_size": "200ml Spout Pouch", "sku": "FIZZ-DMC-200", "mrp": Decimal("15.00"), "selling_price": Decimal("12.00"), "cost_price": Decimal("7.80"), "stock": 1800},
                    {"bottle_size": "500ml Chilled Bottle", "sku": "FIZZ-DMC-500", "mrp": Decimal("30.00"), "selling_price": Decimal("24.00"), "cost_price": Decimal("15.50"), "stock": 950},
                ],
            },
            {
                "name": "Rajwadi Sweet Lassi",
                "slug": "rajwadi-sweet-lassi",
                "category": "DAIRY",
                "flavour": "Thick Malai & Cardamom",
                "is_featured": True,
                "description": "Ultra-thick velvety Gujarati lassi made from whole milk dahi, delicately spiced with cardamom seeds and pure cane sweetness.",
                "image_url": "/images/drinks/rajwadi-lassi.svg",
                "variants": [
                    {"bottle_size": "200ml Clay-Cup Pack", "sku": "FIZZ-RSL-200", "mrp": Decimal("25.00"), "selling_price": Decimal("20.00"), "cost_price": Decimal("13.00"), "stock": 1100},
                    {"bottle_size": "500ml Bottle", "sku": "FIZZ-RSL-500", "mrp": Decimal("55.00"), "selling_price": Decimal("44.00"), "cost_price": Decimal("28.50"), "stock": 600},
                ],
            },
            {
                "name": "Kesar Pista Flavoured Milk",
                "slug": "kesar-pista-milk",
                "category": "DAIRY",
                "flavour": "Kashmiri Kesar & Crunchy Pista",
                "is_featured": True,
                "description": "Creamy sterilized milk infused with genuine Kashmiri saffron strands, crunchy roasted pistachio slivers, and mild sweetness.",
                "image_url": "/images/drinks/kesar-pista-milk.svg",
                "variants": [
                    {"bottle_size": "200ml Glass Bottle", "sku": "FIZZ-KPM-200", "mrp": Decimal("35.00"), "selling_price": Decimal("28.00"), "cost_price": Decimal("18.50"), "stock": 1300},
                ],
            },
        ]

        for item in sample_drinks:
            prod = db.query(Product).filter(Product.slug == item["slug"]).first()
            if not prod:
                prod = Product(
                    name=item["name"],
                    slug=item["slug"],
                    category=item["category"],
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
            else:
                # Update category and image_url if updated
                prod.category = item["category"]
                prod.image_url = item["image_url"]
                db.commit()

        # 4. Gujarat Retail Stockists
        retail_partners = [
            {
                "customer_type": "RETAILER",
                "business_name": "Patel Provision & Cold Corner",
                "contact_name": "Bhavin Patel",
                "phone": "9898012345",
                "email": "patel.provision@example.com",
                "address": "Shop 4, Sardar Complex, C.G. Road",
                "city": "Ahmedabad",
                "state": "Gujarat",
                "notes": "High demand for Jeera Masala and Desi Chaas.",
            },
            {
                "customer_type": "DISTRIBUTOR",
                "business_name": "Shreeji Beverage Agency",
                "contact_name": "Jignesh Shah",
                "phone": "9825098765",
                "email": "shreeji.agency@example.com",
                "address": "G-12, APMC Market, Maninagar",
                "city": "Ahmedabad",
                "state": "Gujarat",
                "notes": "Regional distributor covering East Ahmedabad.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Karnavati Cold Drinks & Snacks",
                "contact_name": "Jayeshbhai Soni",
                "phone": "9879011223",
                "email": "karnavati.cold@example.com",
                "address": "Opp. Law Garden Night Market, Ellisbridge",
                "city": "Ahmedabad",
                "state": "Gujarat",
                "notes": "Prime evening crowd for Kachi Keri and Lassi.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Tapi Refreshment & Dairy Hub",
                "contact_name": "Chetanbhai Desai",
                "phone": "9824155667",
                "email": "tapi.refresh@example.com",
                "address": "Shop 18, Ghod Dod Road, Near Joggers Park",
                "city": "Surat",
                "state": "Gujarat",
                "notes": "Fastest moving Chaas and Lemon Lime stockist.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Dumas Road Corner Store",
                "contact_name": "Nilesh Parekh",
                "phone": "9898233445",
                "email": "dumas.corner@example.com",
                "address": "Shop 7, Royal Arcade, Piplod",
                "city": "Surat",
                "state": "Gujarat",
                "notes": "High weekend sales of party packs and Kesar Milk.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Sayajigunj Daily Needs & Soda Point",
                "contact_name": "Hasmukh Prajapati",
                "phone": "9879033881",
                "email": "sayajigunj.soda@example.com",
                "address": "Station Road, Near Dairy Den Circle, Sayajigunj",
                "city": "Vadodara",
                "state": "Gujarat",
                "notes": "Student and commuter hotspot for Masala Fizz.",
            },
            {
                "customer_type": "DISTRIBUTOR",
                "business_name": "Alkapuri Beverage Traders",
                "contact_name": "Devang Trivedi",
                "phone": "9825477889",
                "email": "alkapuri.traders@example.com",
                "address": "Plot 9, Race Course Circle, Alkapuri",
                "city": "Vadodara",
                "state": "Gujarat",
                "notes": "Central Vadodara distributor.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Saurashtra Kirana & Dairy Junction",
                "contact_name": "Mansukhbhai Patel",
                "phone": "9824088990",
                "email": "saurashtra.dairy@example.com",
                "address": "Dhebar Road, Near Trikon Baug",
                "city": "Rajkot",
                "state": "Gujarat",
                "notes": "Kathiyawadi dinner crowd favorite for Chaas and Jeera.",
            },
            {
                "customer_type": "RETAILER",
                "business_name": "Gondal Road Cold Drink House",
                "contact_name": "Pravinbhai Jadeja",
                "phone": "9898744551",
                "email": "gondal.cold@example.com",
                "address": "Opp. Swaminarayan Temple, Gondal Road",
                "city": "Rajkot",
                "state": "Gujarat",
                "notes": "High demand for Rajwadi Lassi and Kachi Keri.",
            },
        ]

        for ret in retail_partners:
            c = db.query(Customer).filter(Customer.phone == ret["phone"]).first()
            if not c:
                c = Customer(
                    customer_type=ret["customer_type"],
                    business_name=ret["business_name"],
                    contact_name=ret["contact_name"],
                    phone=ret["phone"],
                    email=ret["email"],
                    address=ret["address"],
                    city=ret["city"],
                    state=ret["state"],
                    notes=ret["notes"],
                )
                db.add(c)
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
