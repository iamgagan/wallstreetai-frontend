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

export default function ResumeForm() {
  return <DynamicResumeFormPage />;
}
