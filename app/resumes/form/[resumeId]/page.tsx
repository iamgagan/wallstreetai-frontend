import React from 'react';
import { ResumeFormPage } from '@/components/ResumeSection/ResumeFormPage';

interface ResumeFormByIdProps {
  params: {
    resumeId:string
  }
}

export default function ResumeFormById({ params}: ResumeFormByIdProps) {
  return (
    <ResumeFormPage />
  );
}
