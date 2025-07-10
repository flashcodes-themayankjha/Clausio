
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def extract_clauses_from_text(text: str) -> str:
    prompt = f"""
You are a legal assistant. Extract the following clauses from the contract:

1. Payment Terms
2. Delivery Timeline
3. SLA
4. Penalties
5. Liability

Respond ONLY in this **valid JSON format**:

{{
  "Payment Terms": "...",
  "Delivery Timeline": "...",
  "SLA": "...",
  "Penalties": "...",
  "Liability": "..."
}}

NO markdown, NO commentary, NO extra text — return valid JSON only.

Contract:
\"\"\"
{text[:15000]}
\"\"\"
"""

    try:
        response = model.generate_content(prompt)
        parts = response.candidates[0].content.parts

        if len(parts) == 0 or not hasattr(parts[0], "text"):
            raise ValueError("Gemini response missing expected text.")

        result_text = parts[0].text.strip()

        # Clean markdown wrapping if present
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json", "").replace("```", "").strip()

        print("📦 Gemini Raw Response:\n", result_text)

        parsed = json.loads(result_text)

        # Validate all expected keys are present
        expected_keys = {"Payment Terms", "Delivery Timeline", "SLA", "Penalties", "Liability"}
        if not expected_keys.issubset(parsed.keys()):
            raise ValueError("Missing one or more required keys in Gemini output.")

        return json.dumps(parsed, indent=2)

    except Exception as e:
        print("❌ Gemini clause extraction failed:", e)
        print("🪵 Raw response (if any):", locals().get("result_text", "N/A"))
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

    try:
        response = model.generate_content(prompt)
        parts = response.candidates[0].content.parts

        if len(parts) == 0 or not hasattr(parts[0], "text"):
            raise ValueError("No valid Gemini response text found.")

        return parts[0].text.strip()

    except Exception as e:
        print("❌ Gemini chat response failed:", e)
        return "Sorry, something went wrong while generating the response."
