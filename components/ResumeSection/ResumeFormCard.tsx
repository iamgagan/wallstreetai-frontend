'use client';
import { Card, CardFooter } from '../ui/card';
import { CgFileDocument } from 'react-icons/cg';
import { useUserStore } from '@/store/store';
import Link from 'next/link';

interface ResumeCardProps {
  resumeId: string;
  index: number | string;
}

export const ResumeFormCard = ({ resumeId, index }: ResumeCardProps) => {
  const {
    updateSelectedResume,
    updateSelectedResumeFile,
    resumes,
    resumeFiles,
  } = useUserStore();

  const handleSelectResume = () => {
    const selectedResume = resumes.find((resume) => resume.id === resumeId);
    if (selectedResume) {
      updateSelectedResume(selectedResume);
      const selectedResumeFile = resumeFiles.find(
        (resumeFile) => resumeFile.id === selectedResume.resumeFileId
      );
      if (selectedResumeFile) {
        updateSelectedResumeFile(selectedResumeFile);
      }
    }
  };

  return (
    <Link href={`/resumes/form/${resumeId}`} onClick={handleSelectResume}>
      <Card
        className="w-[18rem] rounded-lg min-h-full flex flex-col justify-center items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2 flex-col-1 cursor-pointer"
        id="loading"
      >
        <CgFileDocument size={35} />
        <CardFooter>
          <p className="text-md">{`My Resume ${index !== undefined && typeof index === 'number' ? Number(index) + 1 : ''}`}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
