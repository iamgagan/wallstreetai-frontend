'use client';
import { useUserStore } from '@/store/store';
import { Card, CardTitle } from '../ui/card';
import { ResumeCard } from './ResumeCard/ResumeCard';
import { ResumeFormCard } from './ResumeFormCard';

export const ResumeSection = () => {
  const { resumes } = useUserStore();

  return (
    <Card className="bg-secondary max-w-[80vw] w-full pb-10 mb-[10rem]">
      <CardTitle className="p-8">Documents</CardTitle>
      <div className="flex flex-wrap gap-6">
        <ResumeCard />
        {resumes && resumes.length > 0
          ? resumes.map((resume, index) => {
              return resume.id ? (
                <ResumeFormCard
                  key={resume.id}
                  resumeId={resume.id}
                  index={index}
                />
              ) : null;
            })
          : null}
      </div>
    </Card>
  );
};
