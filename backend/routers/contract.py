from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
from services.gemini_service import get_gemini_response
from utils.pdf_extractor import extract_text

router = APIRouter()

class PromptInput(BaseModel):
    prompt: str

@router.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    content = await file.read()
    extracted = extract_text(content)
    return {"content": extracted}

@router.post("/chat")
async def chat_contract(prompt_input: PromptInput):
    reply = get_gemini_response(prompt_input.prompt)
    return {"response": reply}
