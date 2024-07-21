import React from 'react';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import Link from 'next/link';

export default function ResumeTemplate() {
  const templates = [1, 2, 3, 4];
  return (
    <NavigationLayout>
      <div className="mx-auto w-[90%] flex flex-col gap-6 items-center mt-[100px]">
        <h1 className="font-bold text-xl text-center">Select a template</h1>
        <div className="flex flex-wrap gap-4">
          {templates.map((item) => (
            <div
              className="max-w-[253px] flex flex-col gap-4  overflow-hidden"
              key={item}
            >
              <Link href="/resumes/form">
                <img
                  src="/toronto-cv-templates.avif"
                  alt="cv-template"
                  className="w-full rounded-lg cursor-pointer hover:border-[1px] hover:border-black p-1"
                />
              </Link>
              <p className="text-sm">Toronto</p>
            </div>
          ))}
        </div>
      </div>
    </NavigationLayout>
  );
}
