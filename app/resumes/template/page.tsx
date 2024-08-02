import React from 'react';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import Link from 'next/link';

export default function ResumeTemplate() {
  const templates = [1, 2, 3, 4];
  return (
    <NavigationLayout>
      <div className="mx-auto mt-[100px] flex w-[90%] flex-col items-center gap-6">
        <h1 className="text-center text-xl font-bold">Select a template</h1>
        <div className="flex flex-wrap gap-4">
          {templates.map((item) => (
            <div
              className="flex max-w-[253px] flex-col gap-4 overflow-hidden"
              key={item}
            >
              <Link href="/resumes/form">
                <img
                  src="/toronto-cv-templates.avif"
                  alt="cv-template"
                  className="w-full cursor-pointer rounded-lg p-1 hover:border-[1px] hover:border-black"
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
