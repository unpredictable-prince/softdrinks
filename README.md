# Fizzora - Premium Beverage Brand & Business Management System

A production-grade, full-stack web application designed for a carbonated soft drink business operating in Gujarat, India.

---

## Key Highlights

- **Visual Brand Experience**: Cinematic showcase of regional beverages (Jeera Masala, Lemon Fizz, Kachi Keri Raw Mango, Heritage Cola) with fluid animations, mobile-first design, interactive flavour selector, and retailer enquiry capture.
- **Robust FastAPI Backend**: REST API with SQLAlchemy 2.0, PostgreSQL persistence, Alembic migrations, and JWT authentication.
- **Enterprise ERP Capabilities**:
  - Customer & Retailer Management
  - B2B Enquiry Tracking & 1-Click Conversion
  - Invoicing & Sales Registers with line-item pricing and cost snapshots
  - Multi-method Payment Tracking (Cash, UPI, NEFT/RTGS) with payment allocations & outstanding balances
  - Inventory Control across warehouse locations with transactional row locking, stock movements, and low-stock alerts
  - Executive Financial Reporting (Gross sales, cash collected, accounts receivable, gross margin, channel breakdown, and CSV exports)

---

## Documentation

- [System Architecture](file:///Users/princesingh/Desktop/drinkbus/docs/architecture.md)
- [Database Schema](file:///Users/princesingh/Desktop/drinkbus/docs/database-schema.md)
- [API Documentation](file:///Users/princesingh/Desktop/drinkbus/docs/api-documentation.md)
- [Deployment Guide](file:///Users/princesingh/Desktop/drinkbus/docs/deployment.md)
- [User Guide](file:///Users/princesingh/Desktop/drinkbus/docs/user-guide.md)

---

## Quick Start

### 1. Database
Ensure PostgreSQL is running locally on port 5432 and create the database:
```bash
createdb fizzora_db
```

### 2. Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
python -m app.core.seed
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public brand showcase and [http://localhost:3000/admin](http://localhost:3000/admin) for the management hub.
Default Admin Credentials:
- **Email**: `admin@fizzora.in`
- **Password**: `FizzoraAdmin2026!`
