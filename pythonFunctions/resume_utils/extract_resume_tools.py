import requests
from langchain.tools import tool
from langchain_community.document_loaders import PyMuPDFLoader, UnstructuredWordDocumentLoader
from pathlib import Path

def get_file_suffix(file_name):
    return Path(file_name).suffix[1:]  # Remove the leading dot

@tool
def fetch_doc_content(file_path: str) -> str:
    """Given pdf file_url, read the file and return the content"""
    file_suffix = get_file_suffix(file_path)

    try:
        if file_suffix == "pdf":
            loader = PyMuPDFLoader(file_path)
            data = loader.load()[0]
            return data.page_content

        elif file_suffix == "docx" or file_suffix == "doc":
            loader = UnstructuredWordDocumentLoader(file_path)
            data = loader.load()[0]
            return data.page_content

    except Exception as e:
        return f"Error reading doc: {str(e)}"

def download_doc(url):
    response = requests.get(url)
    response.raise_for_status()  # Check if the request was successful
    return response.content