from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import contract

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contract.router, prefix="/contract")


app.include_router(contract.router)

@app.get("/")
def root():
    return {"status": "API is running", "endpoints": ["/upload", "/chat"]}
