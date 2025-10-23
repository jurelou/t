from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app.api.dependencies import get_current_active_superuser
from app.models.message import Message

router = APIRouter(prefix="/utils", tags=["utils"])


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    return Message(message="Test email sent")


@router.get("/health-check/")
async def health_check() -> bool:
    return True
