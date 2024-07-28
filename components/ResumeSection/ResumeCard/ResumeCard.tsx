'use client';
import { Card,  } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";

import { IoCloudUploadOutline } from "react-icons/io5";
import { createRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { toast, Toaster } from "react-hot-toast";

export const ResumeCard = () => {
  const inputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const { userId, updateResumes, resumes, resumeFiles, updateResumeFiles } = useUserStore();

  const uploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('file change',e.target.files)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      /**
       * this is the cloudinary upload preset
       */
      formData.append('file', file);
      formData.append('upload_preset', 'vmgixasp');

      try {
        if (file && userId) {
          const res = await fetch("https://api.cloudinary.com/v1_1/dac48s3os/auto/upload", {
            method: "POST",
            body: formData
          });
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
              const { resumeId, resumeFileId, userId, ...otherResumeData } = resumeData;
              // update resumes
              if (resumes.filter(resume => resume.id === resumeId).length === 0) {
                updateResumes([...resumes, { id: resumeId, resumeFileId, ...otherResumeData }]);
              } else {
                const updatedResumes = resumes.map(resume => {
                  if (resume.id === resumeId) {
                    return { id: resumeId, resumeFileId, ...otherResumeData };
                  }
                  return resume;
                });
                updateResumes(updatedResumes);
              }
              // update resumeFiles
              if (resumeFiles.filter(file => file.id === resumeFileId).length === 0) {
                updateResumeFiles([...resumeFiles, { id: resumeFileId, file: secure_url, fileName: file.name, fileType: file.type }]);
              } else {
                const updatedResumeFiles = resumeFiles.map(resumeFile => {
                  if (resumeFile.id === resumeFileId) {
                    return { id: resumeFileId, file: secure_url, fileName: file.name, fileType: file.type };
                  }
                  return resumeFile;
                });
                updateResumeFiles(updatedResumeFiles);
              }
              toast.success('Resume uploaded successfully')
            }
          }
          router.push('/resumes/form');
        }
      } catch (error) {
        toast.error('Failed to upload resume file');
      }
    }
  }
  

  return (
    <Card className='w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2'>
      <Toaster/>
      <ResumeOption
        icon={<IoIosAddCircleOutline size={25} />}
        label='New Resume'
        href='/resumes/template'
        />
      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume'
        inputRef={inputRef}
          onClick={uploadFile}
          onFileChange={handleFileChange}
      />
      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume with AI'
        inputRef={inputRef}
        onClick={uploadFile}
        onFileChange={handleFileChange}
      />
      </Card>
  );
};
