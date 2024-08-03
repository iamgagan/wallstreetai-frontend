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
import clsx from 'clsx';

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
    console.log("this is inputRef",inputRef);
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    console.log(e.target.files && e.target.files.length > 0)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("this is file",file);
      const data = new FormData();
      data.append('file', file);
      data.append('userId', userId);
      console.log("this is data",data);
      try {
        if(file && userId) {
          console.log("this is file",file);
          console.log("this is userId",userId);
          const response = await fetch('/api/resume/upload', {
            method: 'POST',
            body: data
          })

          const dataResponse = await response.json();

          console.log("this is dataResponse",dataResponse);

        //   if (dataResponse){
        //       const { resumeId, resumeFileId, userId, ...otherResumeData } =dataResponse;
        //       // update resumes
        //       const secure_url = dataResponse.awsUrl
        //       if (
        //         resumes.filter((resume) => resume.id === resumeId).length === 0
        //       ) {
        //         updateResumes([
        //           ...resumes,
        //           { id: resumeId, resumeFileId, ...otherResumeData },
        //         ]);
        //       } else {
        //         const updatedResumes = resumes.map((resume) => {
        //           if (resume.id === resumeId) {
        //             return { id: resumeId, resumeFileId, ...otherResumeData };
        //           }
        //           return resume;
        //         });
        //         updateResumes(updatedResumes);
        //       }
        //       // update resumeFiles
        //       if (
        //         resumeFiles.filter((file) => file.id === resumeFileId)
        //           .length === 0
        //       ) {
        //         updateResumeFiles([
        //           ...resumeFiles,
        //           {
        //             id: resumeFileId,
        //             file: secure_url,
        //             fileName: file.name,
        //             fileType: file.type,
        //           },
        //         ]);
        //       } else {
        //         const updatedResumeFiles = resumeFiles.map((resumeFile) => {
        //           if (resumeFile.id === resumeFileId) {
        //             return {
        //               id: resumeFileId,
        //               file: secure_url,
        //               fileName: file.name,
        //               fileType: file.type,
        //             };
        //           }
        //           return resumeFile;
        //         });
        //         updateResumeFiles(updatedResumeFiles);
        //       }
        //       toast.success('Resume uploaded successfully');
        //     }
        //   }
        // router.push('/resumes/form'); 

        }
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
