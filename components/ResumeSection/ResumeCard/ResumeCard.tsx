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
import { postResumeFileToApi } from '@/lib/resume';
import { ResumeUploadSuccessResponse } from '@/types/Resume';

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

  const updateResumesInStore = (
    resumeData: ResumeUploadSuccessResponse,
    file: File
  ) => {
    const { resumeId, resumeFileId, userId, secure_url, ...otherResumeData } =
      resumeData;
    // update selected resume
    const newResume = {
      id: resumeId,
      resumeFileId,
      userId,
      ...otherResumeData,
    };
    updateSelectedResume(newResume);

    // update selected resume file
    const newResumeFile = {
      id: resumeFileId,
      file: secure_url,
      fileName: file.name,
      fileType: file.type,
    };
    updateSelectedResumeFile(newResumeFile);

    // update resumes
    if (resumes.filter((resume) => resume.id === resumeId).length === 0) {
      updateResumes([...resumes, newResume]);
    } else {
      const updatedResumes = resumes.map((resume) => {
        if (resume.id === resumeId) {
          return { id: resumeId, userId, resumeFileId, ...otherResumeData };
        }
        return resume;
      });
      updateResumes(updatedResumes);
    }

    // update resumeFiles
    if (resumeFiles.filter((file) => file.id === resumeFileId).length === 0) {
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
    return { newResume, newResumeFile };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      let newResumeId: string = '';
      try {
        if (file && userId) {
          const dataResponse = await postResumeFileToApi(formData);

          if (dataResponse.error) {
            toast.error(dataResponse.error);
            return;
          }
          const { data: resumeData } = dataResponse;
          if (resumeData) {
            const { newResume } = updateResumesInStore(resumeData, file);
            newResumeId = newResume.id;
            toast.success('Resume uploaded successfully');
          }
        }
        router.push(`/resumes/form/${newResumeId}`);
      } catch (error) {
        toast.error('Failed to upload resume file');
      }
    }
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
