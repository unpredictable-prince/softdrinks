import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    ENVIRONMENT: str = "development"
    PROJECT_NAME: str = "Fizzora Beverages Management System"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "postgresql://localhost:5432/fizzora_db"

    SECRET_KEY: str = "insecure-dev-secret-key-change-in-production-fizzora-2026-secure"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    ADMIN_DEFAULT_NAME: str = "Owner Admin"
    ADMIN_DEFAULT_EMAIL: str = "admin@fizzora.in"
    ADMIN_DEFAULT_PASSWORD: str = "FizzoraAdmin2026!"

    # Brand configuration
    BRAND_NAME: str = "Fizzora"
    BUSINESS_CITY: str = "Ahmedabad"
    BUSINESS_STATE: str = "Gujarat"
    BUSINESS_COUNTRY: str = "India"
    BUSINESS_PHONE: str = "+91 98765 43210"
    BUSINESS_WHATSAPP: str = "+919876543210"
    BUSINESS_EMAIL: str = "contact@fizzora.in"
    BUSINESS_INSTAGRAM: str = "https://instagram.com/fizzora_drinks"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, str) and v.startswith("["):
            return json.loads(v)
        return v


settings = Settings()
