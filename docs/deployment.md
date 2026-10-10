# Fizzora - Deployment & Operational Guide

## Prerequisites
- Node.js 20+ (Node 24 recommended)
- Python 3.12+ (or 3.14)
- PostgreSQL 16+ or 17
- Docker & Docker Compose (optional for containerized deployment)

---

## Local Development Setup

### 1. PostgreSQL Database Setup
```bash
# Using native Homebrew PostgreSQL on macOS:
brew services start postgresql@17
createdb fizzora_db
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env

# Run migrations
alembic upgrade head

# Seed initial admin user and baseline beverage catalog
python -m app.core.seed

# Start development API server
uvicorn app.main:app --reload --port 8000
```
API runs on `http://localhost:8000`. OpenAPI docs available at `http://localhost:8000/docs`.

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local

# Run development server
npm run dev
```
Website runs on `http://localhost:3000`.

---

## Production Deployment Architecture

```
Internet --> [Nginx / Cloudflare CDN]
                  ├──> /api/*  --> FastAPI (Gunicorn + Uvicorn workers) on port 8000
                  └──> /*      --> Next.js Node SSR Server on port 3000
                                       |
                                       v
                                PostgreSQL 17 (Managed / RDS / Cloud SQL)
```

### Environment Variables Matrix

#### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/fizzora_db` |
| `SECRET_KEY` | JWT signing secret | 64-char random hex string |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifespan | `480` |
| `ENVIRONMENT` | Deployment environment | `production` |
| `CORS_ORIGINS` | Allowed frontend domains | `https://fizzora.in,http://localhost:3000` |
| `ADMIN_DEFAULT_EMAIL` | Bootstrap admin email | `admin@fizzora.in` |
| `ADMIN_DEFAULT_PASSWORD` | Bootstrap admin password | `SetSecurePassw0rd!` |

#### Frontend (`frontend/.env.production`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Backend REST endpoint | `https://api.fizzora.in/api/v1` |
| `NEXT_PUBLIC_BRAND_NAME` | Brand Display Name | `Fizzora` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| WhatsApp link destination | `+919876543210` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Official Instagram link | `https://instagram.com/fizzora_drinks` |

---

## Database Backup and Restoration Procedures

### Nightly Backup Script
```bash
pg_dump -Fc -U postgres fizzora_db > /backups/fizzora_db_$(date +%Y%m%d_%H%M%S).dump
```

### Restoration
```bash
pg_restore -U postgres -d fizzora_db -c /backups/fizzora_db_YYYYMMDD_HHMMSS.dump
```
