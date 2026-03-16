from fastapi import FastAPI

from app.api.routes_auth import router as auth_router
from app.api.routes_transactions import router as transactions_router
from app.api.routes_analytics import router as analytics_router
from app.db import models  # noqa: F401
from app.db.base import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance Flow API", version="1.0.0")

app.include_router(auth_router)
app.include_router(transactions_router)
app.include_router(analytics_router)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
  return {"status": "ok"}
