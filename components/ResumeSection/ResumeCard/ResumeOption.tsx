"use client";

import { Card, CardContent } from "../../ui/card";
import React from "react";
import Link from "next/link";
import { Input } from "../../ui/input";

interface ResumeOptionProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onClick?: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ResumeOption = ({
  icon,
  label,
  href,
  onClick,
  inputRef,
  onFileChange,
}: ResumeOptionProps) => {
  return (
    <>
    <Card
      className='w-[90%] rounded-lg flex justify-center hover:border-[1px] hover:border-black hover:bg-primary-foreground cursor-pointer'
      onClick={onClick}
    >
      <Link href={href || ""} className='w-[90%]'>
        <CardContent className='flex gap-3 items-center'>
          {icon}
          <p className='text-sm'>{label}</p>
        </CardContent>
      </Link>
      </Card>
      <Input type="file" className="hidden" ref={inputRef} onChange={onFileChange} defaultValue=""/>
    </>
  );
};

