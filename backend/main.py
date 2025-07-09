from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import contract

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contract.router, prefix="/contract")
