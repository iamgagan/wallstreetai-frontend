import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { NextResponse,  } from 'next/server'
import fetch from 'node-fetch';
import { PYTHON_FUNCTION_BASE_URL } from '@/lib/constants';
import { ExtractedResumeData } from '@/types/Resume';

interface ResumeFileBody {
    userId: string;
    file: string; // this is a url to the file
    fileName: string; // eg. resume.pdf
    fileType: string; // eg. application/pdf
}

interface ExtractedResumeDataError {
    error: string;
}

export async function POST(req: Request) {
    try {
        const { userId, file, fileName, fileType } = await req.json() as ResumeFileBody;
        if (file && userId) {
            // save the file to db
            const fileRes = await updateOrCreateResumeFileByUserId(userId, {
                file,
                fileName,
                fileType,
            })

            if (!fileRes) {
                return NextResponse.json({ error: 'Failed to upload resume file' }, {status: 400});
            }
            
            // extract the data from resume file
            const res = await fetch(`${PYTHON_FUNCTION_BASE_URL}/resume?url=${encodeURIComponent(file)}`);
            const extractedResumeData = await res.json() as ExtractedResumeData | ExtractedResumeDataError;
            if ((extractedResumeData as ExtractedResumeDataError).error) {
                return NextResponse.json({ error: 'Failed to extract data from resume file' }, {status: 400});
            }
            
            if (extractedResumeData) {
                const { personal_details, education, work_experience, qualifications } = extractedResumeData as ExtractedResumeData;
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
                    return NextResponse.json({ error: 'Failed to save extracted data to db' }, {status: 400});
                }

                const successData = {
                    resumeId: resumeDb.id,
                    resumeFileId: resumeDb.resumeFileId,
                    userId: resumeDb.userId,
                    ...extractedResumeData,
                }

                return NextResponse.json({ message: 'Resume file uploaded successfully', data: successData }, { status: 201 });
            } else {
                return NextResponse.json({ error: 'Failed to extract data from resume file' }, {status: 400});
            }
        } else {
            throw new Error('Failed to upload resume');
        }

    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, {status: 500});
    }
   
}