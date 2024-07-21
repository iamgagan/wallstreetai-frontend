'use client';
import { Copy } from "lucide-react"
import { Button } from "../ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { InputWithPrefix } from "../ui/input"
import { useState, useTransition } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { LinkedInURLSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type FormValues = {
  linkedInURL: string;
}

export const ImportFromLinkedIn = () => {
    const [text, setText] = useState<string>('');
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm<FormValues>({
        resolver: zodResolver(LinkedInURLSchema),
        defaultValues: {
           linkedInURL: "",
        },
      });

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
    
    const handleImport = (values: z.infer<typeof LinkedInURLSchema>) => {
      startTransition(() => {
        /**
         * TODO: scrape data from Linkedin profile and return data to the form
         */
        console.log('submit-values',values);
        });
     router.push('/resumes/form');
    }

    return (
        <DialogContent className="sm:max-w-[38rem]">
        <Toaster />
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleImport)} className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle>Import from LinkedIn</DialogTitle>
            <DialogDescription>
              We will import your LinkedIn profile information to create your resume.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <FormField
              control={form.control}
              name='linkedInURL'
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <InputWithPrefix
                        {...form.register('linkedInURL')}
                        type="text"
                        id="linkedInURL"
                        placeholder="username"
                        prefix="https://www.linkedin.com/in/"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
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
            <Button type="button" variant="default">Import</Button>
            </DialogFooter>
          </form>
        </FormProvider>
    </DialogContent>
    )
  }