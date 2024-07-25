import { getResumeFilesByUserId } from '@/lib/resume';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.pathname;
   
    try {
        const response = await getResumeFilesByUserId(userId);
        return Response.json({
            data: response ? response.map((resumeFile) => {
                return {
                    id: resumeFile.id,
                    userId: resumeFile.userId,
                    file: resumeFile.file,
                    fileName: resumeFile.fileName,
                    fileType: resumeFile.fileType,
                }
            }) : null
        });

    } catch (error) {
        return Response.json({ error: 'Internal Server Error' });
    }
   
}