import { Card } from "@/components/ui/card";
import { ResumeOption } from "./ResumeOption";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";

export const ResumeCard = ({}) => {
  return (
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
      <ResumeOption
        icon={<FaLinkedin size={25} color={"#0a66c2"} />}
        label='Import from LinkedIn'
      />
      <ResumeOption
        icon={<IoCloudUploadOutline size={25} />}
        label='Upload Resume'
      />
    </Card>
  );
};
