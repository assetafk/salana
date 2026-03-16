from fastapi import FastAPI

app = FastAPI(title="Finance Flow API", version="1.0.0")


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
  return {"status": "ok"}
