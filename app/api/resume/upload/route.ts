import { updateOrCreateResumeByUserId, updateOrCreateResumeFileByUserId } from '@/lib/resume';
import { Resume } from '@/types/Resume';
import type { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
    userId: string;
    resume: Resume;
    resumeFileId?: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { userId, resume, resumeFileId } = req.body as RequestBody;
    try {
        const response = await updateOrCreateResumeByUserId(userId, resume, resumeFileId);
        res.status(200).json({message: 'Resume uploaded successfully', data: response});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}