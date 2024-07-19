import { Card } from "../ui/card";

export const ResumePreview = () => {
  return (
    <Card className='mt-[100px] w-[50vw]'>
      <div className='p-8 w-full flex items-center flex-col'>
        <h1 className='text-3xl font-bold'>Resume Preview</h1>
        <p className='text-gray-500'>This is how your resume will look like</p>
      </div>
    </Card>
  );
};
