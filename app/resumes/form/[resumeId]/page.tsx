'use client';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import dynamic from 'next/dynamic';

const DynamicResumeFormPage = dynamic(() =>
  import('@/components/ResumeSection/ResumeFormPage').then(
    (mod) => mod.ResumeFormPage
  )
);

export default function ResumeFormById() {
  return (
    <NavigationLayout>
      <DynamicResumeFormPage />
    </NavigationLayout>
  );
}
