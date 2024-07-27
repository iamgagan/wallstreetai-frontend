import json
import os
from typing import Dict, Any
from dotenv import load_dotenv
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
from langchain.tools import tool
import requests

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
model = ChatOpenAI(api_key=api_key, model_name="gpt-4-turbo", temperature=0.8)
mock_linkedin_url = "https://www.linkedin.com/in/francis-hui-6664703a/"


@tool
def get_webpage_contents(url: str) -> str:
    """Reads the webpage with a given URL and returns the page content"""
    try:
        response = requests.get(url, verify=False)  # Disable SSL verification
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return f"Error fetching webpage: {str(e)}"


profile_crawler = Agent(
    role='Professional Profile Crawler',
    goal='Extract the relevant profile of an individual from the url provided, including personal details, '
         'work experience, education and qualifications.',
    backstory='Specialized in parsing HTML and retrieving the profile of an individual',
    verbose=True,
    tools=[get_webpage_contents],
    allow_delegation=False,
    llm=model
)


def extract_profile_information(page_url: str) -> Task:
    return Task(
        description=f"""
        Given this url: {page_url}, extract the personal information, work experience, education and qualifications of an individual. 
        For the work experience description, keep the original version of the information as well as enhance the description of the work experience by rectifying any typos, grammatical errors and sentence structure and present the information in a concise and punchy manner.
        For the education description, keep the original version of the information as well as enhance the description of the education by rectifying any typos, grammatical errors and sentence structure and present the information in a concise and punchy manner.
        Return the information as a JSON string with the following structure:
        {{
            "personal_details": 
                {{
                    "firstName": "John", 
                    "lastName": "Smith", 
                    "email": "abc@gmail.com", 
                    "phoneNumber": "+12345678910", 
                    "addressLine1": "6 William Street", 
                    "addressLine2": "Bronx, NY 10458", 
                    "city": "New York", 
                    "postalCode": "NY 10458", 
                    "country": "US"
                }},
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
                    "institution": "CFA Institute",
                }}
            ]
        }}
        """,
        agent=profile_crawler,
        expected_output="JSON string containing the personal information, work experience, education and "
                        "qualifications of an individual",
    )


def process_profile(job_url: str) -> Dict[str, Any]:
    try:
        extract_profile_information_task = extract_profile_information(job_url)
        crew = Crew(
            agents=[profile_crawler],
            tasks=[extract_profile_information_task],
            verbose=2
        )
        profile_info_json = crew.kickoff()
        profile_info = json.loads(profile_info_json)

        print(json.dumps(profile_info_json, indent=2))

        return {
            "personal_details": json.dumps(profile_info["personal_details"]),
            "work_experience": json.dumps(profile_info["work_experience"]),
            "education": json.dumps(profile_info["education"]),
            "qualifications": json.dumps(profile_info["qualifications"])
        }
    except Exception as e:
        print(f"Error in extracting profile: {e}")
        return {"error": str(e)}


def main(linkedin_url=mock_linkedin_url):
    result = process_profile(linkedin_url)

    if "error" in result:
        print(f"An error occurred: {result['error']}")
    else:
        print("Job Information:")
        print(json.dumps(result["job_info"], indent=2))
        print("\nModified CV:")
        print(json.dumps(result["modified_cv"], indent=2))
        print("\nEvaluation:")
        print(json.dumps(result["evaluation"], indent=2))


if __name__ == "__main__":
    main()
