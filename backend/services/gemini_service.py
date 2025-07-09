import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def extract_clauses_from_text(text: str) -> str:
    prompt = f"""
Extract the following clauses from this contract:

1. Payment Terms
2. Delivery Timeline
3. SLA
4. Penalties
5. Liability

Respond ONLY in this JSON format:

{{
  "Payment Terms": "text",
  "Delivery Timeline": "text",
  "SLA": "text",
  "Penalties": "text",
  "Liability": "text"
}}

Do not include markdown or explanations. JSON only.

Contract:
\"\"\"
{text[:15000]}
\"\"\"
"""

    response = model.generate_content(prompt)
    result_text = response.text.strip()

    # Strip out markdown formatting if any
    if result_text.startswith("```json"):
        result_text = result_text.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(result_text)
        # Optional: Check all keys are present
        expected_keys = {"Payment Terms", "Delivery Timeline", "SLA", "Penalties", "Liability"}
        if not expected_keys.issubset(parsed.keys()):
            raise ValueError("Missing one or more required keys")

        return json.dumps(parsed, indent=2)

    except Exception as e:
        print("DEBUG: Raw Gemini output:\n", result_text)
        return json.dumps({"error": "Invalid clause format returned by LLM"})


def chat_with_contract(message: str, context: str, contract_text: str, clauses: dict) -> str:
    prompt = f"""
You are a legal assistant.

Contract Text:
{contract_text[:5000]}

Extracted Clauses:
{json.dumps(clauses, indent=2)}

Context:
{context}

User Question:
{message}
"""
    response = model.generate_content(prompt)
    return response.text
