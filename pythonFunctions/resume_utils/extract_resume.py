import json
import tempfile
from textwrap import dedent
from typing import Dict, Any, Union
import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from resume_utils.extract_resume_tools import fetch_doc_content, download_doc

load_dotenv()
# Load environment variables
api_key = os.getenv("OPENAI_API_KEY")
model = ChatOpenAI(api_key=api_key, model_name="gpt-4-turbo", temperature=0.8)
mock_cv_url = ""

resume_analyst = Agent(
    role='Resume Analyst',
    goal='Extract personal details, work experience, education and qualifications of an applicant from the document',
    backstory='Specialized in parsing document content for personal details, work experience, education and qualifications of an applicant from the document',
    verbose=True,
    tools=[fetch_doc_content],
    allow_delegation=False,
    llm=model
)


def extract_resume_information(file_path: str) -> Task:
    return Task(
        description=dedent(f""" Given a .pdf, .doc or .docx document provided at this file path: {file_path}, read 
        the file and extract the personal details, work experience, education and qualifications of the applicant. 
        For the work experience description, keep the original version of the information as well as enhance the 
        description of the work experience by rectifying any typos, grammatical errors and sentence structure and 
        present the information in a concise and punchy manner. For the education description, keep the original 
        version of the information as well as enhance the description of the education by rectifying any typos, 
        grammatical errors and sentence structure and present the information in a concise and punchy manner. Return 
        all the information as a JSON string with the following structure: 
        {{
            "personal_details":
                {{ 
                    "firstName": "John", 
                    "lastName": "Smith", 
                    "email": "abc@gmail.com", 
                    "phoneNumber": "+12345678910", 
                    "addressLine1": "6 William Street", 
                    "addressLine2": "Bronx, NY 10458", 
                    "city": "New York City", 
                    "state": "New York", 
                    "postalCode": "NY 10458", 
                    "country": "US" 
                }}, 
            "work_experience": [ 
                {{   
                    "jobTitle": "Investment analyst", 
                    "company": "Blackrock", 
                    "location": "New York", 
                    "startDate": "2021-02-21", 
                    "endDate": "2023-02-22", 
                    "description": "This is the original description of the work experience", 
                    "enhancedDescription": "This is the enhanced description of the work experience", 
                    "currentlyWorkingHere": "True" 
                }} 
            ], 
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
            ], 
            "qualifications": [ 
                {{ 
                    "qualification": "CFA", 
                    "awardedDate": "2023-02-21", 
                    "institution": "CFA Institute" 
                }} 
            ] 
        }}"""),
        agent=resume_analyst,
        expected_output=dedent("JSON dict containing personal details, work experience, education and qualifications "
                               "information"),
    )


def process_resume(file_path: str) -> Union[str, Dict[str, Any]]:
    try:
        extract_resume_details_task = extract_resume_information(file_path)
        crew = Crew(
            agents=[resume_analyst],
            tasks=[extract_resume_details_task],
            verbose=2
        )
        # receive the data as CrewOutput
        crew_output = crew.kickoff()
        
        # Convert CrewOutput to string and remove code block markers
        resume_output = str(crew_output).strip('`')
        if resume_output.startswith('json'):
            resume_output = resume_output[4:]  # Remove 'json' prefix if present
        
        # Attempt to parse the result as JSON
        try:
            resume_json = json.loads(resume_output)
            return resume_json
        except json.JSONDecodeError as e:
            # If JSON parsing fails, return the error and raw output
            return {"error": f"Failed to parse JSON: {str(e)}", "raw_output": resume_output}
        
    except Exception as e:
        print(f"Error in process_resume: {e}")
        return {"error": str(e)}

def main(doc_url=mock_cv_url):
    """This function is used to extract personal details, work experience, education, and qualifications from a
    resume document by supplying a document url. The document can be in .pdf, .doc, or .docx format. The function
    will first download the resume document, create a temp file and hold the file in memory, read the temp file and
    then extract and return the personal details, work experience, education and qualifications information.
    """
    doc_content = download_doc(doc_url)

    # Create a temporary file to save the downloaded PDF
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(doc_content)

    try:
        result = process_resume(temp_file.name)
        if "error" in result:
            print(f"An error occurred: {result['error']}")
        else:
            return result

    finally:
        # Clean up the temp file
        if os.path.exists(temp_file.name):
            os.remove(temp_file.name)


if __name__ == "__main__":
    main()
