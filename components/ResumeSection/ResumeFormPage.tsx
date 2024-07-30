'use client';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { ResumeFormList } from './ResumeFormList';
import { ResumePreview } from './ResumePreview';
import { ResumeMenuTabs } from './ResumeMenuTabs';
import { useState } from 'react';

export const ResumeFormPage = () => {
  const [index, setIndex] = useState(0);
  return (
    <NavigationLayout>
      <div className="flex flex-col gap-y-6 w-full overflow-hidden mt-[100px]">
        <div className="block lg:hidden mx-5">
          <ResumeMenuTabs onTabChange={setIndex} menu={index} />
        </div>
        <div className="lg:flex lg:gap-5 lg:max-w-[100vw] lg:overflow-hidden hidden">
          <div
            className={`overflow-y-scroll overflow-x-hidden w-[50vw] px-5 box-border flex-col flex-1 max-h-[100%]`}
          >
            <ResumeFormList />
          </div>
          <div
            className={`overflow-y-scroll w-[50vw] px-5 box-border flex-1 max-h-[100%]`}
          >
            <ResumePreview />
          </div>
        </div>
        <div className="flex gap-5 max-w-[100vw] overflow-hidden lg:hidden">
          <div
            className={`overflow-y-scroll overflow-x-hidden w-[100vw] px-5 box-border flex-col flex-1 max-h-[100%]`}
          >
            {index === 0 ? <ResumeFormList /> : <ResumePreview />}
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};
