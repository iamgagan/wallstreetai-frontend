import React from 'react';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { ResumeFormList } from '@/components/ResumeSection/ResumeFormList';
import { ResumePreview } from '@/components/ResumeSection/ResumePreview';

export default function CreateResumeWithAI() {
  return (
    <NavigationLayout>
      <div className="flex gap-5 max-w-[95vw] mt-[100px] overflow-hidden">
        <div className="overflow-y-scroll overflow-x-hidden w-[50vw] px-5 box-border flex flex-col flex-1 max-h-[100%]">
          <ResumeFormList />
        </div>
        <div className="overflow-y-scroll w-[50vw] px-5 box-border flex flex-1 max-h-[100%]">
          <ResumePreview />
        </div>
      </div>
    </NavigationLayout>
  );
}
