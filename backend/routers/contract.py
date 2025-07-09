from fastapi import APIRouter, UploadFile, File
from fastapi import Request
from backend.utils.pdf_extractor import extract_text_from_pdf
from backend.services.gemini_service import extract_clauses_from_text, chat_with_contract
from backend.models.contract import ChatRequest, ClauseExtractionResult
import json

router = APIRouter()

@router.post("/upload", response_model=ClauseExtractionResult)
async def upload_contract(file: UploadFile = File(...)):
    path = "temp.pdf"
    with open(path, "wb") as f:
        f.write(await file.read())
    
    contract_text = extract_text_from_pdf(path)
    clause_raw = extract_clauses_from_text(contract_text)
    try:
        clause_data = json.loads(clause_raw)
    except Exception:
        clause_data = {"error": "Gemini response not in JSON format", "raw": clause_raw}

    return {"contract_text": contract_text, "clauses": clause_data}

@router.post("/chat")
async def chat(request: ChatRequest):
    if request.context == "full":
        context = request.contract_text
    else:
        context = request.clauses.get(request.context, "")
    
    reply = chat_with_contract(request.message, context)
    return {"reply": reply}
