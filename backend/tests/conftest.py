import pytest
from decimal import Decimal
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.session import Base, get_db
from app.core.config import settings
from app.core.security import hash_password
from app.models.user import User
from app.models.inventory import InventoryLocation, InventoryBalance, InventoryMovement
from app.models.product import Product, ProductVariant
from app.models.customer import Customer

# Use current database for test suite in transaction rollback or isolated session
from app.db.session import SessionLocal

@pytest.fixture(scope="session")
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="session")
def admin_token(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": settings.ADMIN_DEFAULT_EMAIL, "password": settings.ADMIN_DEFAULT_PASSWORD},
    )
    assert response.status_code == 200, f"Login failed: {response.text}"
    return response.json()["access_token"]


@pytest.fixture(scope="session")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}
