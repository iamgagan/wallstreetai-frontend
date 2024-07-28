'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { ImportFromLinkedIn } from "../../ImportFromLinkedIn.tsx/ImportFromLinkedIn";
import { createRef } from "react";
import { useRouter } from "next/navigation";
import { fileToBase64String } from "@/lib/fileToBase64String";
import { useUserStore } from "@/store/store";
import { useSession } from "next-auth/react";

export const ResumeCard = () => {
  const inputRef = createRef<HTMLInputElement>();
  const router = useRouter();
  const { userId } = useUserStore();

  const uploadFile = () => {
    console.log("this is inputRef",inputRef);
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("this is e",e);
    if (e.target.files && e.target.files.length > 0) {
      console.log("this is e.target.files",e.target.files);
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('userId', userId);
      console.log("this is data",data);
      try {
        if(file && userId) {
          const response = await fetch('/api/resumeFile/upload', {
            method: 'POST',
            body: data
          })
        }
        router.push('/resumes/form');
      } catch (error) {
        console.error(error);
      }
      /**
       * TODO: extract pdf data and return the data to 
       */

      
    }
  }

  return (
    <Dialog>
    <Card className='w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2'>
      <ResumeOption
        icon={<IoIosAddCircleOutline size={25} />}
        label='New Resume'
        href='/resumes/template'
        />
         <DialogTrigger asChild>
        <Button
          variant="ghost"
          className='w-[90%] flex justify-start hover:border-[1px] hover:border-black hover:bg-primary-foreground cursor-pointer bg-secondary py-2 h-[60px] shadow-xl rounded-lg'
        >
            <CardContent className='flex gap-3 items-center justify-start'>
              <FaLinkedin size={25} color={"#0a66c2"} />
              <p className='text-sm'>Import from LinkedIn</p>
            </CardContent>
        </Button>
      </DialogTrigger>
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
      <ImportFromLinkedIn/>
    </Dialog>
  );
};
