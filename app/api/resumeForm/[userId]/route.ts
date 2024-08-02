import { getResumesByUserId } from '@/lib/resume';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.pathname;

  try {
    const response = await getResumesByUserId(userId);
    return NextResponse.json({ resumes: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
