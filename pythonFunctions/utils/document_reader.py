import base64
import tempfile
import os
from PyPDF2 import PdfFileReader


def extract_text_from_base64_pdf(base64_string, file_type):
    # Decode the base64 string to get the binary PDF data

    pdf_data = base64.b64decode(base64_string)
    file_type_suffix = file_extension(file_type)
    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_type_suffix) as temp_pdf_file:
        temp_pdf_path = temp_pdf_file.name
        # Write the binary data to the temporary file
        temp_pdf_file.write(pdf_data)

    try:
        # Use the PDF reader function to read the temporary PDF file
        text = extract_text_from_pdf(temp_pdf_path)
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)

    return text


def file_extension(file_type):
    return {
        'application/pdf': '.pdf',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'text/plain': '.txt',
    }.get(file_type, '')


# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PdfFileReader(file)
        for page_num in range(reader.numPages):
            page = reader.getPage(page_num)
            text += page.extract_text()
    return text
