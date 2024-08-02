import { Card, CardTitle } from '../ui/card';
import { ResumeCard } from './ResumeCard/ResumeCard';
import { ResumeFormCard } from './ResumeFormCard';
import { auth } from '@/auth';
import { Session } from 'next-auth';

export const ResumeSection = async () => {
  const { user } = (await auth()) as Session;

  return (
    <Card className="bg-secondary max-w-[80vw] w-full pb-10 mb-[10rem]">
      <CardTitle className="p-8">Documents</CardTitle>
      <div className="flex flex-wrap gap-6">
        <ResumeCard />
        {user && user?.resumes && user?.resumes.length > 0
          ? user.resumes.map((resume, index) => {
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
