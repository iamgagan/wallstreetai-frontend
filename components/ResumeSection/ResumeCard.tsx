"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoIosAddCircle } from "react-icons/io";

export const ResumeCard = ({}) => {
  return (
    <Card className='w-[15rem] h-[12rem] rounded-lg flex justify-center items-center'>
      <CardContent className='flex gap-2'>
        <IoIosAddCircle size={40} />
        <p>New Resume</p>
      </CardContent>
    </Card>
  );
};
