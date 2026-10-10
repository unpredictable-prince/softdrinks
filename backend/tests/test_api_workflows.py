import uuid
from decimal import Decimal
import pytest


def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"


def test_unauthorized_access(client):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401


def test_login_success_and_me(client, auth_headers):
    response = client.get("/api/v1/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "admin@fizzora.in"
    assert data["role"] == "ADMIN"


def test_public_product_catalog(client):
    response = client.get("/api/v1/products")
    assert response.status_code == 200
    drinks = response.json()
    assert len(drinks) >= 4
    # Ensure cost price is not leaked in public responses
    for d in drinks:
        for v in d["variants"]:
            assert "cost_price" not in v


def test_public_enquiry_submission(client):
    payload = {
        "contact_name": "Kiritbhai Soni",
        "business_name": "Soni Cold Storage & Provision",
        "phone": f"98240{uuid.uuid4().hex[:5]}",
        "email": "kiritbhai@example.com",
        "city": "Rajkot",
        "enquiry_type": "DISTRIBUTOR",
        "estimated_demand": "100 crates weekly",
        "message": "Interested in dealership for Saurashtra highway zone.",
        "source_channel": "WEBSITE",
    }
    response = client.post("/api/v1/enquiries", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["city"] == "Rajkot"
    assert data["status"] == "NEW"


def test_customer_creation_and_enquiry_conversion(client, auth_headers):
    unique_phone = f"999{uuid.uuid4().hex[:7]}"
    enquiry_payload = {
        "contact_name": "Ghanshyam Patel",
        "business_name": "Sardar Kirana Store",
        "phone": unique_phone,
        "email": "ghanshyam@example.com",
        "city": "Surat",
        "enquiry_type": "RETAILER",
        "estimated_demand": "20 crates weekly",
        "message": "Looking to stock Jeera and Lemon drinks.",
        "source_channel": "WEBSITE",
    }
    enquiry_res = client.post("/api/v1/enquiries", json=enquiry_payload)
    assert enquiry_res.status_code == 201
    enquiry_id = enquiry_res.json()["id"]

    # Convert to customer
    convert_payload = {
        "customer_type": "RETAILER",
        "gstin": "24AABCS9999Z1Z5",
        "address": "Ring Road, Surat",
    }
    convert_res = client.post(
        f"/api/v1/enquiries/{enquiry_id}/convert",
        json=convert_payload,
        headers=auth_headers,
    )
    assert convert_res.status_code == 200
    cust_data = convert_res.json()
    assert cust_data["contact_name"] == "Ghanshyam Patel"
    assert cust_data["city"] == "Surat"


def test_sales_lifecycle_inventory_and_payments(client, auth_headers):
    # 1. Fetch products & variants
    prod_res = client.get("/api/v1/products/admin/all", headers=auth_headers)
    assert prod_res.status_code == 200
    products = prod_res.json()
    variant = products[0]["variants"][0]
    variant_id = variant["id"]
    unit_price = float(variant["selling_price"])

    # 2. Fetch customer
    cust_res = client.get("/api/v1/customers", headers=auth_headers)
    assert cust_res.status_code == 200
    customer = cust_res.json()[0]
    customer_id = customer["id"]

    # 3. Check starting inventory balance
    inv_res = client.get("/api/v1/inventory/balances", headers=auth_headers)
    assert inv_res.status_code == 200
    initial_stock = next(b["quantity_on_hand"] for b in inv_res.json() if b["product_variant_id"] == variant_id)

    # 4. Create DRAFT sale
    order_qty = 10
    sale_payload = {
        "customer_id": customer_id,
        "source_channel": "DIRECT",
        "status": "DRAFT",
        "notes": "Test draft sale",
        "items": [
            {
                "product_variant_id": variant_id,
                "quantity": order_qty,
                "unit_price": unit_price,
                "discount_amount": 0.0,
                "tax_amount": 0.0,
            }
        ],
    }
    create_sale_res = client.post("/api/v1/sales", json=sale_payload, headers=auth_headers)
    assert create_sale_res.status_code == 201
    sale_data = create_sale_res.json()
    sale_id = sale_data["id"]
    expected_total = round(order_qty * unit_price, 2)
    assert float(sale_data["total_amount"]) == expected_total
    assert sale_data["status"] == "DRAFT"

    # DRAFT must NOT deduct inventory
    inv_check = client.get("/api/v1/inventory/balances", headers=auth_headers).json()
    stock_after_draft = next(b["quantity_on_hand"] for b in inv_check if b["product_variant_id"] == variant_id)
    assert stock_after_draft == initial_stock

    # 5. Confirm sale -> MUST deduct inventory
    confirm_res = client.post(f"/api/v1/sales/{sale_id}/confirm", headers=auth_headers)
    assert confirm_res.status_code == 200
    assert confirm_res.json()["status"] == "CONFIRMED"

    inv_after_confirm = client.get("/api/v1/inventory/balances", headers=auth_headers).json()
    stock_after_confirm = next(b["quantity_on_hand"] for b in inv_after_confirm if b["product_variant_id"] == variant_id)
    assert stock_after_confirm == initial_stock - order_qty

    # 6. Check Sale details: Total paid should be 0.0, outstanding balance == total_amount
    detail_res = client.get(f"/api/v1/sales/{sale_id}", headers=auth_headers)
    assert detail_res.status_code == 200
    detail = detail_res.json()
    assert float(detail["total_paid"]) == 0.0
    assert float(detail["outstanding_balance"]) == expected_total

    # 7. Record partial payment (e.g. ₹50 via UPI)
    partial_amount = min(50.0, expected_total)
    payment_payload = {
        "payment_method": "UPI",
        "amount": partial_amount,
        "transaction_reference": "UPI987654321000",
        "notes": "Advance via PhonePe",
        "allocations": [
            {
                "sale_id": sale_id,
                "allocated_amount": partial_amount,
            }
        ],
    }
    pay_res = client.post("/api/v1/payments", json=payment_payload, headers=auth_headers)
    assert pay_res.status_code == 201

    # 8. Verify Sale balance updated
    detail_res_2 = client.get(f"/api/v1/sales/{sale_id}", headers=auth_headers)
    detail_2 = detail_res_2.json()
    assert float(detail_2["total_paid"]) == partial_amount
    assert float(detail_2["outstanding_balance"]) == round(expected_total - partial_amount, 2)

    # 9. Test cancellation reverses inventory
    cancel_res = client.post(f"/api/v1/sales/{sale_id}/cancel", headers=auth_headers)
    assert cancel_res.status_code == 200
    inv_after_cancel = client.get("/api/v1/inventory/balances", headers=auth_headers).json()
    stock_after_cancel = next(b["quantity_on_hand"] for b in inv_after_cancel if b["product_variant_id"] == variant_id)
    assert stock_after_cancel == initial_stock


def test_dashboard_and_csv_reports(client, auth_headers):
    # Test Dashboard API
    dash_res = client.get("/api/v1/reports/dashboard", headers=auth_headers)
    assert dash_res.status_code == 200
    data = dash_res.json()
    assert "gross_sales" in data
    assert "net_sales" in data
    assert "payments_received" in data
    assert "outstanding_balances" in data

    # Test Sales CSV export
    sales_csv_res = client.get("/api/v1/reports/sales-csv", headers=auth_headers)
    assert sales_csv_res.status_code == 200
    assert "text/csv" in sales_csv_res.headers["content-type"]
    assert "Invoice Number" in sales_csv_res.text

    # Test Inventory CSV export
    inv_csv_res = client.get("/api/v1/reports/inventory-csv", headers=auth_headers)
    assert inv_csv_res.status_code == 200
    assert "text/csv" in inv_csv_res.headers["content-type"]
    assert "Warehouse Code" in inv_csv_res.text
