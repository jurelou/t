import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings

from app.core.events import start_app_handler, stop_app_handler
from app.api.errors import http_error_handler, http_422_error

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"

def get_application() -> FastAPI:
    """Configure and returns a FastAPI application."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        debug=False,
        version="0.0.1",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        generate_unique_id_function=custom_generate_unique_id,
    )


    app.add_event_handler("startup", start_app_handler(app))
    app.add_event_handler("shutdown", stop_app_handler(app))

    app.add_exception_handler(RequestValidationError, http_422_error)
    app.add_exception_handler(HTTPException, http_error_handler)

    # Set all CORS enabled origins
    if settings.all_cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.all_cors_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    api_router.include_router(router, prefix=settings.API_V1_STR)

app = get_application()

