import { useUserStore } from '@/store/store';
import { Card, CardTitle } from '../ui/card';
import { ResumeCard } from './ResumeCard/ResumeCard';
import { ResumeFormCard } from './ResumeFormCard';

export const ResumeSection = () => {
  const { resumes, updateSelectedResume, updateSelectedResumeFile } =
    useUserStore();

  return (
    <Card className="bg-secondary max-w-[80vw] w-full pb-10 mb-[10rem]">
      <CardTitle className="p-8">Documents</CardTitle>
      <div className="flex flex-wrap gap-6">
        <ResumeCard />
        {resumes.map((resume) => {
          return resume.id ? (
            <ResumeFormCard key={resume.id} resumeId={resume.id} />
          ) : null;
        })}
      </div>
    </Card>
  );
};
