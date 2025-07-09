from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
from services.gemini_service import chat_with_contract, extract_clauses_from_text
from utils.pdf_extractor import extract_text_from_pdf

router = APIRouter()

class PromptInput(BaseModel):
    message: str
    context: str
    contract_text: str
    clauses: dict

@router.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    content = await file.read()
    extracted_text = extract_text_from_pdf(content)
    clause_summary = extract_clauses_from_text(extracted_text)
    return {"content": clause_summary}

@router.post("/chat")
async def chat_contract(prompt_input: PromptInput):
    reply = chat_with_contract(
        message=prompt_input.message,
        context=prompt_input.context,
        contract_text=prompt_input.contract_text,
        clauses=prompt_input.clauses
    )
    return {"response": reply}
