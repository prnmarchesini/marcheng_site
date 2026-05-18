"""Contact form endpoint."""

import logging

from fastapi import APIRouter, status

from marcheng_api.schemas.contact import ContactPayload, ContactResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def submit_contact(payload: ContactPayload) -> ContactResponse:
    """Accept a contact submission. Email integration to be added."""
    logger.info("Contact form submission from %s <%s>", payload.name, payload.email)
    return ContactResponse(status="received")
