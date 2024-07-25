import { updateOrCreateResumeFileByUserId } from '@/lib/resume';
import {NextResponse, NextRequest} from 'next/server'

type RequestBody = {
    file: string; // base64 string
    fileName: string;
    fileType: string;
    userId: string;
}

export async function POST(req: NextRequest) {
    const { file, userId, fileName, fileType } = await req.json() as RequestBody;
    try {
        const response = await updateOrCreateResumeFileByUserId(userId, {
            file,
            fileName,
            fileType,
        })
        return Response.json({message: 'Resume uploaded successfully', data: response}, {status: 201});
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, {status: 500});
    }
   
}