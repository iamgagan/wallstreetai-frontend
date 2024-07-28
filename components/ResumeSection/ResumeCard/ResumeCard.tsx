'use client';
import { Card,  } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";

import { IoCloudUploadOutline } from "react-icons/io5";
import { createRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { Resume } from '@/types/Resume';

export const ResumeCard = () => {
  const inputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const { userId } = useUserStore();

  const uploadFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          }
        }
        router.push('/resumes/form');
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (

    <Card className='w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2'>
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
