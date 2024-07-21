'use client';
import { Copy } from "lucide-react"
import { Button } from "../ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { InputWithPrefix } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export const ImportFromLinkedIn = () => {
    const [text, setText] = useState('');
    const router = useRouter();

  const copyText = () => {
    navigator.clipboard.writeText("https://www.linkedin.com/in/" + text)
      .then(() => {
          toast.success('Copied to clipboard', {
              position: 'top-right',
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
    
    const handleImport = () => {
     router.push('/resumes/form');
    }

    return (
        <DialogContent className="sm:max-w-[38rem]">
        <Toaster />
          <DialogHeader>
            <DialogTitle>Import from LinkedIn</DialogTitle>
            <DialogDescription>
              We will import your LinkedIn profile information to create your resume.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <InputWithPrefix
                id="link"
                placeholder="username"
                prefix="https://www.linkedin.com/in/"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            </div>
            <Button type="submit" size="sm" className="px-3 active:bg-white active:text-black" onClick={copyText}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-end flex gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="default" onClick={handleImport}>Import</Button>
          </DialogFooter>
        </DialogContent>
    )
  }