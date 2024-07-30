import { getResumeFilesByUserId } from '@/lib/resume';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.pathname;

  try {
    const response = await getResumeFilesByUserId(userId);
    return NextResponse.json(
      {
        data: response
          ? response.map((resumeFile) => {
              return {
                id: resumeFile.id,
                userId: resumeFile.userId,
                file: resumeFile.file,
                fileName: resumeFile.fileName,
                fileType: resumeFile.fileType,
              };
            })
          : null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
