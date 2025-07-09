import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def extract_clauses_from_text(text: str) -> str:
    prompt = f"""
Extract the following clauses from this contract:
1. Payment Terms
2. Delivery Timeline
3. SLA
4. Penalties
5. Liability

Format:
{{
  "Payment Terms": "...",
  "Delivery Timeline": "...",
  "SLA": "...",
  "Penalties": "...",
  "Liability": "..."
}}

Contract:
{text[:15000]}
"""
    response = model.generate_content(prompt)
    return response.text

def chat_with_contract(message: str, context: str) -> str:
    prompt = f"""
You are a legal assistant.

Context:
{context}

User Question:
{message}
"""
    response = model.generate_content(prompt)
    return response.text
