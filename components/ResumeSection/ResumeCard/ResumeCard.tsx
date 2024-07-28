'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "../../ui/button";
import { createRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { Resume } from '@/types/Resume';

export const ResumeCard = () => {
  const inputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const { userId } = useUserStore();

  const uploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'vmgixasp');
 
      try {
        if (file && userId) {
          const res = await fetch("https://api.cloudinary.com/v1_1/dac48s3os/auto/upload", {
            method: "POST",
            body: formData
          });
          const { secure_url } = await res.json();
          if (secure_url) {
            const postRes = await fetch('/api/resumeFile/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                file: secure_url,
                fileName: file.name,
                fileType: file.type,
              }),
            });
            const data = await postRes.json();
            console.log('resume-data', data)
          }
        }
        // router.push('/resumes/form');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleSaveData = async () => {
    const resumeFileId = 'clz5mek3e0001gfne3ass84ew'
    const resumeData:Resume = {
      userId,
      file: "https://res.cloudinary.com/dac48s3os/image/upload/v1722174788/oxfal71h8gkbxnzfc3fg.pdf",
      fileName: "Resume Sample.pdf",
      fileType: "application/pdf",
      education: [
        {
          currentlyStudyingHere: 'True',
          degree: 'B.S. in Economics & B.A Data Science',
          description: 'Cumulative GPA: 3.9 / 4.0. Relevant Coursework: Business Accounting, Macroeconomics, Financial Econ, Statistics, Linear Algebra, Data Analysis. Programs: Goldman Sachs Women’s Possibilities Summit (2024), Ares Women in Alternative Investing Program (2023).',
          endDate: '',
          enhancedDescription: 'Achieving a GPA of 3.9 in a dual major of Economics and Data Science, with coursework including Business Accounting, Macroeconomics, and Data Analysis. Participated in prestigious programs like Goldman Sachs Women’s Possibilities Summit and Ares Women in Alternative Investing.',
          fieldOfStudy: 'Economics, Data Science',
          institution: 'University of California, Berkeley',
          startDate: 'Expected May 2026'
        }
      ],
      personalInfo: {
        addressLine1: '2161 Allston Way',
        addressLine2: '',
        city: 'Berkeley',
        country: 'USA',
        email: 'sarahcys1121@berkeley.edu',
        firstName: 'Sarah',
        lastName: 'Chen',
        phoneNumber: '(510)-332-7753',
        postalCode: ''
      },
      qualifications: [
        {
          awardedDate: '2026-05-01',
          institution: 'University of California, Berkeley',
          qualification: 'Relevant Coursework'
        }
      ],
      workExperience: [
        {
          company: 'Westlake Securities',
          currentlyWorkingHere: 'False',
          description: 'Incoming Sophomore Summer Analyst',
          endDate: '2024-08-31',
          enhancedDescription: 'Designated as a Sophomore Summer Analyst.',
          jobTitle: 'Incoming Sophomore Summer Analyst',
          location: 'San Francisco, CA',
          startDate: '2024-06-01'
        },
        {
          company: '52 Capital Partners',
          currentlyWorkingHere: 'True',
          description: 'Involved in a sell-side M&A transaction for a cybersecurity company; researched and identified multiple strategic acquirers in the cloud computing and cybersecurity industries and created corporate profiles for a 45-page client update presentation. Provided ad-hoc support across various business development, deal origination and execution initiatives including assisting the team with buyer outreach, preparing pitch decks and marketing materials (teasers & CIMs) for sell-side processes. Created and distributed weekly newsletters, outlining new developments & investor activity in various sectors.',
          endDate: 'Present',
          enhancedDescription: 'Participated in a sell-side M&A transaction for a cybersecurity company, researching and profiling strategic acquirers in cloud computing and cybersecurity, and produced a detailed 45-page client update. Supported business development and deal origination, including buyer outreach and material preparation for pitches. Compiled and issued weekly sector-specific newsletters detailing new developments and investor activities.',
          jobTitle: 'Investment Banking Intern Analyst',
          location: 'San Francisco, CA',
          startDate: '2023-08-01'
        },
        {
          company: 'Madison Park Group',
          currentlyWorkingHere: 'False',
          description: 'Engaged in a capital raise project for a marketing technology company; screened and sourced a list of 80+ institutional investment firms, created an Excel dashboard that summarized their strategy and organized the results into a presentation. Assisted with the drafting of weekly capital markets & M&A activity newsletters as part of the firm’s research offering; reviewed financing, merger and acquisition activities in various industries and summarized the transaction overviews. Researched the enterprise application software sector, evaluated the market size, risk factors, competitive positioning, and tailwinds driving growth potential, and determined key competitors within the North American market.',
          endDate: '2023-08-31',
          enhancedDescription: 'Contributed to a capital raise for a marketing tech firm by screening and evaluating over 80 investment firms, and developing an organized presentation via an Excel dashboard. Supported the creation of weekly newsletters on capital markets and M&A activities, providing succinct summaries of key transactions. Conducted detailed research on the enterprise application software sector, assessing market dynamics and competitive landscapes.',
          jobTitle: 'Investment Banking Intern Analyst',
          location: 'New York, NY',
          startDate: '2023-06-01'
        },
        {
          company: 'The Asclepian Group',
          currentlyWorkingHere: 'False',
          description: 'Assisted with the evaluation of 3 partnership proposals; reviewed the terms against investment criteria, analyzed key financial metrics & competitive positionings, and highlighted market trends to ensure alignment. Drafted an industry research report on the Healthcare space, synthesizing equity research and CapIQ findings.',
          endDate: '2023-06-30',
          enhancedDescription: 'Evaluated three partnership proposals, analyzing financial metrics and market trends to assess alignment with investment criteria. Authored a comprehensive industry research report on the healthcare sector, integrating equity research and CapIQ data.',
          jobTitle: 'Search Fund Intern Analyst',
          location: 'Providence, RI',
          startDate: '2023-05-01'
        }
      ]
    }
    const response = await fetch('/api/resumeForm/upload',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        resume: resumeData,
        resumeFileId
      })
    })
    const data = await response.json();
    console.log('success-data', data)
    return data;
  }

  return (

    <Card className='w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2'>
      <ResumeOption
        icon={<IoIosAddCircleOutline size={25} />}
        label='New Resume'
        href='/resumes/template'
        />
  
        <Button
          variant="ghost"
          className='w-[90%] flex justify-start hover:border-[1px] hover:border-black hover:bg-primary-foreground cursor-pointer bg-secondary py-2 h-[60px] shadow-xl rounded-lg'
          onClick={handleSaveData}
        >
            <CardContent className='flex gap-3 items-center justify-start'>
              <FaLinkedin size={25} color={"#0a66c2"} />
              <p className='text-sm'>Import from LinkedIn</p>
            </CardContent>
        </Button>

      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume'
        inputRef={inputRef}
          onClick={uploadFile}
          onFileChange={handleFileChange}
      />
      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume with AI'
        inputRef={inputRef}
        onClick={uploadFile}
        onFileChange={handleFileChange}
      />
      </Card>

  );
};
