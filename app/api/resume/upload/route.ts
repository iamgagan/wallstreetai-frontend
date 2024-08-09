import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { Resume } from '@/types/Resume';
import { NextRequest, NextResponse } from 'next/server';
import { FileUpload } from '@/lib/uploadAws';
import { PYTHON_FUNCTION_BASE_URL } from '@/lib/constants';
import { ExtractedResumeData } from '@/types/Resume';

interface ExtractedResumeDataError {
    error: string;
  }

export async function extractRequestInfo(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.getAll('file') as File[];
    const resumeFile = file[0] as File;
    const fileName = resumeFile.name;
    const fileType = resumeFile.type;
    const userId = formData.get('userId') as string;

    return { file, resumeFile, fileName, fileType, userId };
}

export async function uploadToAws(userId: string, resumeFile: File, resumeFileId?: string) {
    const fileUpload = new FileUpload();
    try {
        const response:any = await fileUpload.uploadAws(userId, resumeFile, resumeFileId);
        return { awsUrl : response.awsUrl  || null};
    } catch (error) {
        console.error("Error uploading to AWS:", error);
        throw new Error("Failed to upload file to AWS");
    }
}

export async function POST(req: NextRequest) {
   
    const { file, resumeFile, fileName, fileType, userId } = await extractRequestInfo(req);
    if (!file || !fileName || !fileType || !userId) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const { awsUrl } = await uploadToAws(userId, resumeFile, userId);

    try {
        const fileRes = await updateOrCreateResumeFileByUserId(userId,
            {file: awsUrl, 
            fileName, 
            fileType});
            if (!fileRes) {
                return NextResponse.json({ error: 'Failed to save extracted data to db' }, { status: 400 });
            }
            const res = await fetch(
                `${PYTHON_FUNCTION_BASE_URL}/resume?url=${encodeURIComponent(awsUrl)}`
              );

              const extractedResumeData = (await res.json()) as
              | ExtractedResumeData
              | ExtractedResumeDataError;
            if ((extractedResumeData as ExtractedResumeDataError).error) {
              return NextResponse.json(
                { error: 'Failed to extract data from resume file' },
                { status: 400 }
              );
            }
      
            if (extractedResumeData) {
              const { personal_details, education, work_experience, qualifications } =
                extractedResumeData as ExtractedResumeData;
              // save the extracted data to db
              const resumeDb = await updateOrCreateResumeByUserId(
                userId,
                {
                  userId,
                  personalInfo: personal_details,
                  education,
                  workExperience: work_experience,
                  qualifications: qualifications,
                  skills: [],
                },
                fileRes.id
              );

      
              if (!resumeDb) {
                return NextResponse.json(
                  { error: 'Failed to save extracted data to db' },
                  { status: 400 }
                );
              }
      
              const successData = {
                resumeId: resumeDb.id,
                resumeFileId: resumeDb.resumeFileId,
                userId: resumeDb.userId,
                personalInfo: resumeDb.personalInfo,
                education: resumeDb.education,
                workExperience: resumeDb.workExperience,
                qualifications: resumeDb.qualification,
                secure_url:awsUrl,
                ...extractedResumeData,
              };
      
              return NextResponse.json(
                { message: 'Resume file uploaded successfully', data: successData },
                { status: 201 }
              );
            } else {
              return NextResponse.json(
                { error: 'Failed to extract data from resume file' },
                { status: 400 }
              );
            }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  
}