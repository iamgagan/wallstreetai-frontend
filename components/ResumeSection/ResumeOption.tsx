"use client";

import { Card, CardContent } from "../ui/card";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogClose, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

interface ResumeOptionProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export const ResumeOption = ({
  icon,
  label,
  href,
  onClick,
}: ResumeOptionProps) => {
  return (
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
  );
};

const ButtonContent = () => {
  return (
    <div>
      <FaLinkedin size={25} color={"#0a66c2"} />
      <p className='text-sm'>Import from LinkedIn</p>
    </div>
  );

}

export const ResumeOptionWithModal = ({
  icon,
  label,
  onClick,
}: ResumeOptionProps) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
