import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        # Load the PDF from bytes
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""

        # Extract text page by page
        for page in doc:
            page_text = page.get_text("text")  # explicitly specify "text" to avoid fallback modes
            if page_text:
                text += page_text + "\n"

        return text.strip()

    except Exception as e:
        print("DEBUG: PDF text extraction failed:", e)
        return ""

