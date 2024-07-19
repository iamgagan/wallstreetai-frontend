import React from "react";
import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";
import { ResumeFormList } from "@/components/ResumeSection/ResumeFormList";
import { ResumePreview } from "@/components/ResumeSection/ResumePreview";

export default function CreateResumeWithAI() {
  return (
    <NavigationLayout>
      <div className="flex gap-5 max-w-[95vw]">
        <ResumeFormList />
        <ResumePreview/>
      </div>
    </NavigationLayout>
  );
}
