from fastapi import FastAPI

from .db.base import Base, engine
from .db import models  # noqa: F401  # ensure models are imported for metadata

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance Flow API", version="1.0.0")


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
  return {"status": "ok"}
