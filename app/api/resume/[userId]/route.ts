import { getResumesByUserId } from '@/lib/resume';
import { Resume } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
type QueryParams = {
    userId: string;
}

type ResponseData  = {
    resumes: Resume[] | null;
} | { error: string };

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { userId } = req.query as QueryParams;
   
    try {
        const response = await getResumesByUserId(userId);
        return NextResponse.json({ resumes: response});
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' });
    }

}