import { Card, CardTitle } from "../ui/card";
import { ResumeCard } from "./ResumeCard/ResumeCard";

export const ResumeSection = () => {
  return (
    <Card className='bg-secondary max-w-[80vw] w-full pb-10 mb-[10rem]'>
      <CardTitle className='p-8'>Documents</CardTitle>
      <div>
        <ResumeCard />
      </div>
    </Card>
  );
};
