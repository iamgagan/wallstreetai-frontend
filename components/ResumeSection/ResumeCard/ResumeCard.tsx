'use client';
import { Card } from '@/components/ui/card';
import { ResumeOption } from './ResumeOption';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { IoCloudUploadOutline } from 'react-icons/io5';
import { createRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { toast, Toaster } from 'react-hot-toast';
import { LoadingModal } from '@/components/LoadingModal/LoadingModal';

export const ResumeCard = () => {
  const inputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const {
    userId,
    updateResumes,
    resumes,
    resumeFiles,
    updateResumeFiles,
    updateIsUploadWithAI,
    updateSelectedResume,
    updateSelectedResumeFile,
  } = useUserStore();
  const [loading, setLoading] = useState(false);

  const uploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      /**
       * this is the cloudinary upload preset
       */
      formData.append('file', file);
      formData.append('upload_preset', 'vmgixasp');
      let newResumeId: string = '';
      try {
        if (file && userId) {
          const res = await fetch(
            'https://api.cloudinary.com/v1_1/dac48s3os/auto/upload',
            {
              method: 'POST',
              body: formData,
            }
          );
          const { secure_url } = await res.json();

          if (secure_url) {
            const postRes = await fetch('/api/resumeFile/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                file: secure_url,
                fileName: file.name,
                fileType: file.type,
              }),
            });
            const data = await postRes.json();
            if (data.error) {
              toast.error(data.error);
              return;
            }
            const { data: resumeData } = data;
            if (resumeData) {
              const { resumeId, resumeFileId, userId, ...otherResumeData } =
                resumeData;
              // update resumes
              newResumeId = resumeId;
              const newResume = {
                id: resumeId,
                resumeFileId,
                ...otherResumeData,
              };
              updateSelectedResume(newResume);
              const newResumeFile = {
                id: resumeFileId,
                file: secure_url,
                fileName: file.name,
                fileType: file.type,
              };
              updateSelectedResumeFile(newResumeFile);
              if (
                resumes.filter((resume) => resume.id === resumeId).length === 0
              ) {
                updateResumes([...resumes, newResume]);
              } else {
                const updatedResumes = resumes.map((resume) => {
                  if (resume.id === resumeId) {
                    return { id: resumeId, resumeFileId, ...otherResumeData };
                  }
                  return resume;
                });
                updateResumes(updatedResumes);
              }
              // update resumeFiles
              if (
                resumeFiles.filter((file) => file.id === resumeFileId)
                  .length === 0
              ) {
                updateResumeFiles([...resumeFiles, newResumeFile]);
              } else {
                const updatedResumeFiles = resumeFiles.map((resumeFile) => {
                  if (resumeFile.id === resumeFileId) {
                    return newResumeFile;
                  }
                  return resumeFile;
                });
                updateResumeFiles(updatedResumeFiles);
              }
              toast.success('Resume uploaded successfully');
            }
          }
          router.push(`/resumes/form/${newResumeId}`);
        }
      } catch (error) {
        toast.error('Failed to upload resume file');
      }
    }
    setLoading(false);
  };

  const handleUploadWithAI = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    updateIsUploadWithAI(true);
  };

  return (
    <>
      <Card
        className="w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2"
        id="loading"
      >
        <Toaster />
        <ResumeOption
          icon={<IoIosAddCircleOutline size={25} />}
          label="New Resume"
          href="/resumes/template"
        />
        <ResumeOption
          icon={<IoCloudUploadOutline size={25} />}
          label="Upload Resume"
          inputRef={inputRef}
          onClick={uploadFile}
          onFileChange={handleFileChange}
        />
        <ResumeOption
          icon={<IoCloudUploadOutline size={25} />}
          label="Upload Resume with AI"
          inputRef={inputRef}
          onClick={uploadFile}
          onFileChange={handleUploadWithAI}
        />
      </Card>
      <LoadingModal loading={loading} setLoading={setLoading} />
    </>
  );
};
