from fastapi import FastAPI
from backend.routers import contract

app = FastAPI()

app.include_router(contract.router)
