from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import tarifas

app = FastAPI(title="Serrano Turismo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(tarifas.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}
