'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ImportFromLinkedIn } from "../ImportFromLinkedIn.tsx/ImportFromLinkedIn";

export const ResumeCard = ({ }) => {
  return (
    <Dialog>
    <Card className='w-[18rem] rounded-lg flex flex-col justify-start items-center border-dashed border-[1px] border-black ml-8 pt-3 pb-5 gap-2'>
      <ResumeOption
        icon={<IoIosAddCircleOutline size={25} />}
        label='New Resume'
        href='/resumes/template'
      />
      <ResumeOption
        icon={<IoIosAddCircleOutline size={25} />}
        label='New Resume with AI'
        href='resumes/create-with-ai'
        />
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className='w-[90%] flex justify-center hover:border-[1px] hover:border-black hover:bg-primary-foreground cursor-pointer bg-secondary py-2 h-[60px] shadow-xl rounded-lg'
        >
            <CardContent className='flex gap-3 items-center'>
              <FaLinkedin size={25} color={"#0a66c2"} />
              <p className='text-sm'>Import from LinkedIn</p>
            </CardContent>
        </Button>
      </DialogTrigger>

      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume'
      />
      </Card>
      <ImportFromLinkedIn/>
    </Dialog>
  );
};
