#!/bin/sh
set -e

echo "==> Waiting for PostgreSQL database to be ready..."
python << 'EOF'
import os
import sys
import time
import psycopg2

db_url = os.environ.get("DATABASE_URL", "postgresql://postgres:postgrespassword@db:5432/fizzora_db")
if "+asyncpg" in db_url:
    db_url = db_url.replace("+asyncpg", "")

max_retries = 30
for i in range(max_retries):
    try:
        conn = psycopg2.connect(db_url)
        conn.close()
        print("==> PostgreSQL connection successful!")
        sys.exit(0)
    except Exception as e:
        print(f"==> Waiting for database... ({i+1}/{max_retries})")
        time.sleep(1)

print("==> Database connection failed after maximum retries.")
sys.exit(1)
EOF

echo "==> Running Alembic migrations..."
alembic upgrade head

echo "==> Seeding initial data..."
python -m app.core.seed

echo "==> Starting application server..."
exec "$@"
