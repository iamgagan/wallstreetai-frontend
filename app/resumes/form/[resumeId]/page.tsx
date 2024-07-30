'use client';
import dynamic from 'next/dynamic';

const DynamicResumeFormPage = dynamic(
  () =>
    import('@/components/ResumeSection/ResumeFormPage').then(
      (mod) => mod.ResumeFormPage
    ),
  {
    ssr: false,
  }
);

interface ResumeFormByIdProps {
  params: {
    resumeId?: string;
  };
}

export default function ResumeFormById({ params }: ResumeFormByIdProps) {
  const { resumeId } = params;
  if (!resumeId) {
    return null;
  }
  return <DynamicResumeFormPage />;
}
