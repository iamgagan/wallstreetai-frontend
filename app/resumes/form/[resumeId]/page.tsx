'use client';
import { ResumeFormPage } from '@/components/ResumeSection/ResumeFormPage';

interface ResumeFormByIdProps {
  params: {
    resumeId: string;
  };
}

export default function ResumeFormById({ params }: ResumeFormByIdProps) {
  const { resumeId } = params;
  if (!resumeId) {
    return null;
  }
  return <ResumeFormPage />;
}
