import {
  updateOrCreateResumeByUserId,
  updateOrCreateResumeFileByUserId,
} from '@/lib/resume';
import { NextRequest, NextResponse } from 'next/server';
import { ExtractedResumeData } from '@/types/Resume';
import { extractRequestInfo, uploadToAws } from '@/actions/resumeFileUtils';

interface ExtractedResumeDataError {
  error: string;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { file, resumeFile, fileName, fileType, userId } =
    await extractRequestInfo(formData);
  if (!file || !fileName || !fileType || !userId) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  const { awsUrl } = await uploadToAws(userId, resumeFile, userId);

  try {
    const fileRes = await updateOrCreateResumeFileByUserId(userId, {
      file: awsUrl,
      fileName,
      fileType,
    });
    if (!fileRes) {
      return NextResponse.json(
        { error: 'Failed to save extracted data to db' },
        { status: 400 }
      );
    }
    const res = await fetch(
      `${process.env.PYTHON_FUNCTION_BASE_URL}/resume?url=${encodeURIComponent(awsUrl)}`
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
        secure_url: awsUrl,
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
