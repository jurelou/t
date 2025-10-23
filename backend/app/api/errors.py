from fastapi import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY
from fastapi.openapi.utils import validation_error_response_definition
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from fastapi.openapi.constants import REF_PREFIX

from typing import Union

async def http_error_handler(_: Request, exc: HTTPException) -> JSONResponse:
    """Intercept all http errors."""
    return JSONResponse({"errors": [exc.detail]}, status_code=exc.status_code)

async def http_422_error(
    _: Request, exc: Union[RequestValidationError, ValidationError]
) -> JSONResponse:
    """Intercept 422 errors (UNPROCESSABLE_ENTITY)."""
    return JSONResponse(
        {"errors": exc.errors()}, status_code=HTTP_422_UNPROCESSABLE_ENTITY
    )


validation_error_response_definition["properties"] = {
    "errors": {
        "title": "Errors",
        "type": "array",
        "items": {"$ref": "{}ValidationError".format(REF_PREFIX)},
    }
}