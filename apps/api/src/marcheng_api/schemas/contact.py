"""Pydantic schemas for contact form."""

from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class ContactPayload(BaseModel):
    """Payload submitted by the contact form."""

    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = None
    company: str | None = None
    message: str = Field(..., min_length=10, max_length=5000)
    locale: Literal["pt", "en", "es", "it"] = "pt"


class ContactResponse(BaseModel):
    """Response after a contact submission."""

    status: str
