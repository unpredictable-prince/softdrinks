# Fizzora - REST API Documentation (/api/v1)

FastAPI provides interactive OpenAPI (Swagger) documentation automatically at `/docs` and ReDoc at `/redoc`.

---

## Authentication & Headers
Protected endpoints require an `Authorization` header containing a valid Bearer JWT token:
```http
Authorization: Bearer <access_token>
```

---

## 1. Public Endpoints (No Auth Required)

### `GET /api/v1/products`
Retrieves all published beverage products with active variants.
- Query Parameters: `featured` (bool, optional)
- Response: 200 OK list of `ProductPublicResponse`

### `GET /api/v1/products/{slug}`
Retrieves detailed information for a single product by slug.
- Response: 200 OK `ProductPublicDetailResponse` or 404 Not Found

### `POST /api/v1/enquiries`
Submits a retailer or distributor inquiry from the public website.
- Request Body: `EnquiryCreate` (contact_name, business_name, phone, email, city, enquiry_type, estimated_demand, message)
- Rate Limit: 10 requests / minute / IP
- Response: 201 Created `EnquiryResponse`

---

## 2. Authentication Endpoints

### `POST /api/v1/auth/login`
Authenticates administrative or staff users and issues a signed JWT access token.
- Request Body: `LoginRequest` (email, password)
- Response: 200 OK `{ access_token, token_type: "bearer", user: UserResponse }`

### `GET /api/v1/auth/me`
Fetches the profile and permission role of the authenticated user.
- Response: 200 OK `UserResponse`

---

## 3. Product & Variant Management (Admin / Staff)

### `POST /api/v1/products`
Creates a new beverage product.

### `PUT /api/v1/products/{id}`
Updates product attributes, status, and imagery.

### `POST /api/v1/products/{id}/variants`
Adds a bottle size/SKU variant to an existing product.

### `PUT /api/v1/products/variants/{variant_id}`
Updates variant pricing (MRP, selling price, cost price) or reorder thresholds.

---

## 4. Customer & Enquiry Management

### `GET /api/v1/customers`
Lists customers with filtering by city, customer_type, or search query.

### `POST /api/v1/customers`
Creates a retailer/distributor customer profile.

### `GET /api/v1/enquiries`
Lists leads with status filters (`NEW`, `QUALIFIED`, `CONVERTED`, etc.).

### `PATCH /api/v1/enquiries/{id}/status`
Updates lead status, follow-up date, and notes.

### `POST /api/v1/enquiries/{id}/convert`
Converts lead into a customer record and links future sales.

---

## 5. Sales Register

### `GET /api/v1/sales`
Lists sales invoices with pagination, date range, customer, and status filters.

### `POST /api/v1/sales`
Creates a sale invoice. If status is `CONFIRMED` or `FULFILLED`, automatically verifies stock availability and records stock deductions.

### `GET /api/v1/sales/{id}`
Returns complete sale details, line items, snapshots, allocated payments, and computed outstanding balance.

### `POST /api/v1/sales/{id}/confirm`
Transitions a `DRAFT` sale to `CONFIRMED`, acquiring row-level locks on inventory and deducting stock.

### `POST /api/v1/sales/{id}/cancel`
Cancels sale and atomically reverses any previously deducted inventory with reason logging.

---

## 6. Payment Tracking & Allocations

### `GET /api/v1/payments`
Lists payment records with date and method filters.

### `POST /api/v1/payments`
Records a payment (CASH, UPI, BANK_TRANSFER, CHEQUE) and optionally allocates it to one or more sales.

### `POST /api/v1/payments/{id}/verify`
Staff verification of pending payments.

---

## 7. Inventory & Warehouse Management

### `GET /api/v1/inventory/balances`
Current stock across variants and locations. Highlights items below `reorder_threshold`.

### `POST /api/v1/inventory/adjust`
Records stock movement (RECEIPT, DAMAGE, EXPIRY, ADJUSTMENT) with mandatory reason.

### `GET /api/v1/inventory/movements`
Audit log of all inventory transactions.

---

## 8. Dashboard & Financial Reports

### `GET /api/v1/reports/dashboard`
Aggregated business metrics:
- Gross Sales & Net Sales
- Total Payments Received & Outstanding Balances
- Units Sold & Best Performing Flavours
- Channel-wise Sales Breakdown
- Open Enquiries & Lead Conversion Rate

### `GET /api/v1/reports/sales-csv`
Exports sales register as standard CSV.

### `GET /api/v1/reports/inventory-csv`
Exports current stock balances as CSV.
