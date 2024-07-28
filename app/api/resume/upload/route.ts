import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { Resume } from '@/types/Resume';
import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';

type RequestBody = {
    userId: string;
    resume: Resume;
    resumeFileId?: string;
}

export async function POST(req: NextRequest) {

    console.log("this is req",req);
    const formData = await req.formData();
    console.log("this is formData",formData);
    const file = formData.getAll('file');



    // if (!file || !fileName || !fileType || !userId) {
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    // }
    const { userId, resume, resumeFileId } = await req.json() as RequestBody;
    try {
        const response = await updateOrCreateResumeByUserId(userId, resume, resumeFileId);
        return NextResponse.json({message: 'Resume uploaded successfully', data: response}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  
}