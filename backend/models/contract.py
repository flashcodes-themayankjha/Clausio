from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ChatRequest(BaseModel):
    message:str
    context:str
    contract_text:str
    clauses:Dict[str,str]

class ClauseExtractionResult(BaseModel):
    contract_text: str
    clauses: Dict[str, str]
