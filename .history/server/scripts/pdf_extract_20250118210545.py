import PyPDF2

# Step 1: Extract text from PDF
def extract_text_from_pdf(file_path):
    try:
        with open(file_path, "rb") as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""


# Provide the path to your PDF file
pdf_path = "Zachary_Tianyi_Tang_resume.pdf"

# Extract text and process it with OpenAI
resume_text = extract_text_from_pdf(pdf_path)
print(resume_text)
