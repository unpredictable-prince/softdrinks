# Fizzora - Premium Beverage Brand & Business Management Architecture

## System Overview

Fizzora is a full-stack beverage brand website and enterprise operational management system tailored for carbonated soft drink operations in Gujarat, India. It combines a high-aesthetic, cinematic consumer & distributor facing brand presence with an internal ERP/business management core that manages inventory, field/retail sales, payment reconciliation, retailer leads, and real-time business reporting.

---

## Architectural Principles

1. **Separation of Concerns**: Clear demarcation between Public Presentation (Next.js App Router), API Gateway & Business Orchestration (FastAPI), Data Persistence (PostgreSQL 17+ with SQLAlchemy 2.0 ORM), and Asynchronous Workflows (Email/Notifications).
2. **Explicit Financial Invariants**: Strict financial integrity where Sales and Payments are separate first-class entities. Total Sale Value, Payment Allocations, and Outstanding Balances are computed deterministically without floating-point inaccuracies (using SQL numeric precision).
3. **Immutable Auditing & Inventory Tracking**: Every stock alteration must occur through an `inventory_movement` record with transactional isolation and optimistic or row-level locking. Financial adjustments generate auditable log trails.
4. **Configurable Brand & Market Localization**: Product details, packaging sizes, GST/tax rates, regional currency (INR `₹`), contact channels (WhatsApp, Instagram, Regional Calling lines) are centralized in runtime configuration.

---

## High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                      |
+-----------------------------------------------------------------------------------+
|   Public Showcase (Next.js 15)           |   Admin Business Hub (Next.js 15)      |
|   - Hero & Brand Story                   |   - Sales & Invoice Register           |
|   - Live Product Showcase & Flavours     |   - Payment Verification & Allocations |
|   - B2B Distribution Enquiry Forms       |   - Real-time Inventory & Stock alerts |
|   - WhatsApp & Direct Lead Links         |   - Customer & Lead CRM                |
|   - Mobile-First Fluid Visuals           |   - Financial & Channel Reporting      |
+------------------------------------------+----------------------------------------+
                                  |
                                  | HTTPS / REST (JSON)
                                  v
+-----------------------------------------------------------------------------------+
|                              BACKEND API (FastAPI)                                |
+-----------------------------------------------------------------------------------+
|  Routers (/api/v1):                                                               |
|  - /auth        : JWT token issuance, session checks, password hashing            |
|  - /products    : Public catalog + Admin CRUD & variant management                |
|  - /enquiries   : Public lead generation, rate limiting, CRM lead workflow        |
|  - /customers   : Retailer, distributor & direct customer records                 |
|  - /sales       : Order placement, draft/confirm/fulfill lifecycles               |
|  - /payments    : Multi-channel payment recording, verification & allocation      |
|  - /inventory   : Warehouse balances, stock adjustments, low-stock notifications  |
|  - /reports     : Revenue, receivables, gross margins, channel analytics, CSV    |
+-----------------------------------------------------------------------------------+
                                  |
                                  | SQLAlchemy 2.x (Unit of Work + Repositories)
                                  v
+-----------------------------------------------------------------------------------+
|                           PERSISTENCE LAYER (PostgreSQL)                          |
+-----------------------------------------------------------------------------------+
|  - users & audit_logs                                                             |
|  - products & product_variants                                                    |
|  - customers & enquiries                                                          |
|  - sales & sale_items                                                             |
|  - payments & payment_allocations                                                 |
|  - inventory_locations, inventory_balances & inventory_movements                  |
+-----------------------------------------------------------------------------------+
```

---

## Directory Structure

```
drinkbus/
├── frontend/               # Next.js 15 App Router Frontend
│   ├── app/                # Route pages (public marketing + /admin)
│   ├── components/         # Reusable UI widgets, layout, navigation
│   ├── features/           # Domain-specific UI (sales, inventory, enquiries)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client, utility functions, formatting
│   ├── public/             # Static brand assets, drink photography
│   ├── types/              # TypeScript schema interfaces
│   ├── tests/              # Component and E2E specs
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── backend/                # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/         # Versioned endpoint routes
│   │   ├── core/           # Security, config, rate limiting, exceptions
│   │   ├── db/             # Database session and base configuration
│   │   ├── models/         # SQLAlchemy 2.0 ORM models
│   │   ├── schemas/        # Pydantic v2 validation models
│   │   ├── services/       # Core business logic (inventory, sales, payments)
│   │   ├── repositories/   # Database query abstractions
│   │   └── main.py         # Application entry point
│   ├── alembic/            # Database migration scripts
│   ├── tests/              # Pytest backend test suite
│   ├── requirements.txt
│   └── .env.example
├── docs/                   # Architectural & technical documentation
│   ├── architecture.md
│   ├── database-schema.md
│   ├── api-documentation.md
│   ├── deployment.md
│   └── user-guide.md
├── docker-compose.yml      # Local development container configuration
├── .gitignore
└── README.md
```

---

## Key Business Workflows

### 1. Enquiry-to-Customer & Sale Conversion
1. Retailer submits enquiry on public website or phone/WhatsApp lead is recorded manually.
2. Staff reviews lead in CRM (`/admin/enquiries`), sets follow-up notes.
3. Once qualified, staff clicks "Convert to Customer", creating a customer record with zero duplication.
4. Staff initiates a Sale linked to this customer and enquiry.

### 2. Sale Creation & Inventory Deduction
1. Staff creates Sale (`DRAFT`). Adds variants (e.g., 200ml Jeera Masala, 500ml Lemon Fizz, 1.25L Cola).
2. Calculates subtotal, applies volume discounts, sets GST (e.g. 12% or 28% for CSD in India).
3. Total amount calculated. Stock is **not** deducted while in `DRAFT`.
4. When transitioned to `CONFIRMED` or `FULFILLED`, a database transaction verifies sufficient `quantity_on_hand` at the designated warehouse location with row locking (`SELECT FOR UPDATE`), decrements balance, and generates `inventory_movement` records.
5. If cancelled, stock is reverted with a movement record of type `RETURN` or `CANCELLATION`.

### 3. Payment Reconciliation & Allocation
1. Payments can be received via Cash, UPI (e.g. Google Pay, PhonePe, Paytm), Bank Transfer (NEFT/RTGS), or Cheque.
2. Payment is recorded with status `PENDING` or `VERIFIED` by authorized staff.
3. Payment is allocated to one or more sales via `payment_allocations`.
4. The system recalculates `outstanding_balance` for each sale. Over-allocation is strictly prohibited.
