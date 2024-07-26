import json
from typing import Dict, Any
import os

import requests
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from langchain_community.document_loaders import PyMuPDFLoader
from dotenv import load_dotenv

# from langchain_community.document_loaders.word_document import UnstructuredWordDocumentLoader
# import base64
# import tempfile
# from document_reader import extract_text_from_pdf

load_dotenv()
# Load environment variables
api_key = os.getenv("API_KEY")
model = ChatOpenAI(api_key=api_key, model_name="gpt-4-turbo", temperature=0.8)
pdf_url = 'https://res.cloudinary.com/dac48s3os/image/upload/v1722011750/Sarah_Chen_CV_yebcz4.pdf'


@tool
def fetch_doc_content(file_url: str) -> str:
    """Given pdf file_url, read the file and return the content"""

    # doc_data = base64.b64decode(base64_string)
    # file_type_suffix = file_extension(file_type)
    #
    # # Create a temporary file
    # with tempfile.NamedTemporaryFile(delete=False, suffix=file_type_suffix) as temp_file:
    #     temp_path = temp_file.name
    #     # Write the binary data to the temporary file
    #     temp_file.write(doc_data)
    try:
        # if file_type_suffix == ".pdf":
        loader = PyMuPDFLoader(file_url)
        data = loader.load()[0]
        return data.page_content

        # elif file_type_suffix == ".docx" or file_type_suffix == ".doc":
        #     loader = UnstructuredWordDocumentLoader(temp_path)
        #     data = loader.load()[0]
        #     return data.page_content

    except Exception as e:
        return f"Error reading doc: {str(e)}"

@tool
def get_webpage_contents(url: str) -> str:
    """Reads the webpage with a given URL and returns the page content"""
    try:
        response = requests.get(url, verify=False)  # Disable SSL verification
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return f"Error fetching webpage: {str(e)}"




personal_details_analyst = Agent(
    role='Personal Details Analyst',
    goal='Extract personal details of an applicant from the document, including first name, last name, email address, '
         'phone number, address line1, address line2, city, postal code and country',
    backstory='Specialized in parsing document content for personal details',
    verbose=True,
    tools=[get_webpage_contents],
    allow_delegation=False,
    llm=model
)

work_experience_analyst = Agent(
    role='Work Experience Analyst',
    goal='Extract the work experience of an applicant from the document, including job title, company name, '
         'company location, start date, end date, job description for all the past and present jobs',
    backstory='Specialized in parsing document content for work experience',
    verbose=True,
    tools=[get_webpage_contents],
    allow_delegation=False,
    llm=model
)

education_analyst = Agent(
    role='Education Analyst',
    goal='Extract the education history of an applicant from the document, including institution name, degree, '
         'field of study, start date, end date, description for all past and present education',
    backstory='Specialized in parsing document content for education',
    verbose=True,
    tools=[get_webpage_contents],
    allow_delegation=False,
    llm=model
)

qualifications_analyst = Agent(
    role='Qualification Analyst',
    goal='Extract qualifications of an applicant from the document, including qualification name, awarded date and '
         'awarding institution',
    backstory='Specialized in parsing document content for qualifications',
    verbose=True,
    tools=[get_webpage_contents],
    allow_delegation=False,
    llm=model
)


def extract_personal_details(file_url: str) -> Task:
    return Task(
        description=f""" Given a .pdf, .doc or .docx document provided at this url: {file_url}, read the file and extract the personal details of the applicant. Return the information as a JSON string with the following structure: 
        {{ 
            "firstName": "John", 
            "lastName": "Smith", 
            "email": "abc@gmail.com", 
            "phoneNumber": "+12345678910", 
            "addressLine1": "6 William Street", 
            "addressLine2": "Bronx, NY 10458", 
            "city": "New York", 
            "postalCode": "NY 10458", 
            "country": "US", 
        }} """,
        agent=personal_details_analyst,
        expected_output="JSON string containing personal details information",
    )


def extract_work_experience(file_url: str) -> Task:
    return Task(
        description=f""" Given a .pdf, .doc or .docx document provided at this url: {file_url}, read the file and extract the work experience of the applicant. Keep the original description of the work experience as well as enhance the description of the work experience by rectifying any typos, grammatical errors and sentence structure. Return the information as a JSON string with the following 
        structure: 
        {{ 
            "work_experience": [ 
                {{   "jobTitle": "Investment analyst",
                    "company": "Blackrock",
                    "location": "New York",
                    "startDate": "2021-02-21",
                    "endDate": "2023-02-22",
                    "description": "This is the original description of the work experience",
                    "enhancedDescription": "This is the enhanced description of the work experience",
                    "currentlyWorkingHere": "True"
                }}
            ]
        }} """,
        agent=work_experience_analyst,
        expected_output="JSON string containing work experience information",
    )


def extract_education(file_url: str) -> Task:
    return Task(
        description=f""" Given a .pdf, .doc or .docx document provided at this url: {file_url}, read the file and extract the education history of the applicant. Keep the original description 
        of the education as well as enhance the description of the education by rectifying any typos, grammatical 
        errors and sentence structure. Return the information as a JSON string with the following structure: 
        {{ 
            "education": [ 
                {{
                        "institution": "New York University",
                        "degree": "Master in Finance",
                        "fieldOfStudy": "Finance",
                        "startDate": "2019-02-21",
                        "endDate": "2020-02-22",
                        "description": "This is the original description of the education",
                        "enhancedDescription": "This is the enhanced description of the education",
                        "currentlyStudyingHere": "False"
                }}
            ]
        }} """,
        agent=education_analyst,
        expected_output="JSON string containing education information",
    )


def extract_qualifications(file_url: str) -> Task:
    return Task(
        description=f""" Given a .pdf, .doc or .docx document provided at this url: {file_url}, read the file and extract the education history of the applicant. Return the information as a JSON 
        string with the following structure: 
        {{ 
            "education": [
                {{
                    "qualification": "CFA",
                    "awardedDate": "2023-02-21",
                    "institution": "CFA Institute",
                }}
            ]
        }} """,
        agent=qualifications_analyst,
        expected_output="JSON string containing qualifications information",
    )


def parse_json_output(output: str) -> Dict[str, Any]:
    try:
        # Try to extract JSON from the string
        json_start = output.index('{')
        json_end = output.rindex('}') + 1
        json_str = output[json_start:json_end]
        return json.loads(json_str)
    except (ValueError, json.JSONDecodeError):
        return {"error": f"Failed to parse JSON from string: {output}"}


def process_resume(file_path: str) -> Dict[str, Any]:
    try:
        extract_personal_details_task = extract_personal_details(file_path)
        crew = Crew(
            agents=[personal_details_analyst],
            tasks=[extract_personal_details_task],
            verbose=2
        )
        personal_details = crew.kickoff()

        extract_work_experience_task = extract_work_experience(file_path)
        crew = Crew(
            agents=[work_experience_analyst],
            tasks=[extract_work_experience_task],
            verbose=2
        )
        work_experience = crew.kickoff()

        extract_education_task = extract_education(file_path)
        crew = Crew(
            agents=[work_experience_analyst],
            tasks=[extract_work_experience_task],
            verbose=2
        )
        education = crew.kickoff()

        extract_qualifications_task = extract_qualifications(file_path)
        crew = Crew(
            agents=[qualifications_analyst],
            tasks=[extract_qualifications_task],
            verbose=2
        )
        qualifications = crew.kickoff()

        return {
            "personal_details": personal_details,
            "work_experience": work_experience,
            "education": education,
            "qualifications": qualifications,
        }
    except Exception as e:
        print(f"Error in process_resume: {e}")
        return {"error": str(e)}


def main():
    result = process_resume(pdf_url)

    if "error" in result:
        print(f"An error occurred: {result['error']}")
    else:
        print("Personal_details:")
        print(json.dumps(result["personal_details"], indent=2))
        print("\nWork_experience:")
        print(json.dumps(result["work_experience"], indent=2))
        print("\nEducation:")
        print(json.dumps(result["education"], indent=2))
        print("\nQualifications:")
        print(json.dumps(result["qualifications"], indent=2))


if __name__ == "__main__":
    main()
