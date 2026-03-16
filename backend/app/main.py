from fastapi import FastAPI

from app.api.routes_auth import router as auth_router
from app.db import models  # noqa: F401
from app.db.base import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance Flow API", version="1.0.0")

app.include_router(auth_router)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
  return {"status": "ok"}
