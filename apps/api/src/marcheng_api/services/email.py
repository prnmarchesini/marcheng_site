"""Email service — placeholder for future Resend integration."""

import logging

logger = logging.getLogger(__name__)


async def send_contact_notification(
    name: str,
    email: str,
    message: str,
) -> None:
    """Send a contact notification email. Placeholder."""
    logger.info("Email would be sent: %s <%s>: %s", name, email, message[:80])
