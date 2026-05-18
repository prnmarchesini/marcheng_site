"""Application settings loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    environment: str = "development"
    port: int = 8000
    cors_origins: list[str] = ["http://localhost:3000"]
    resend_api_key: str | None = None
    contact_email_to: str | None = None


settings = Settings()
