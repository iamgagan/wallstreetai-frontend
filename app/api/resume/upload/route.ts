import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { Resume } from '@/types/Resume';
import { NextRequest, NextResponse } from 'next/server';
import { FileUpload } from '@/lib/uploadAws';


type RequestBody = {
    userId: string;
    resume: Resume;
    resumeFileId?: string;
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

    console.log('this is awsUrl', awsUrl);

    const { resume, resumeFileId } = await req.json() as RequestBody;
    try {
        const response = await updateOrCreateResumeByUserId(userId, resume, resumeFileId);
        return NextResponse.json({message: 'Resume uploaded successfully', data: response}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  
}