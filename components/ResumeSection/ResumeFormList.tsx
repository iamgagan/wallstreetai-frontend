'use client';
import { RxPerson } from 'react-icons/rx';
import { ResumeAccordion } from './ResumeAccordion';
import { LuBuilding2 } from 'react-icons/lu';
import { RiGraduationCapLine } from 'react-icons/ri';
import { GrDocumentText } from 'react-icons/gr';
import dynamic from 'next/dynamic';

const DynamicWorkExperienceForm = dynamic(
  () =>
    import('./ResumeForms/WorkExperienceForm').then(
      (mod) => mod.WorkExperienceForm
    ),
  { ssr: false }
);

const DynamicPersonalInformationForm = dynamic(
  () =>
    import('./ResumeForms/PersonalInformationForm').then(
      (mod) => mod.PersonalInformationForm
    ),
  {
    ssr: false,
  }
);

const DynamicEducationForm = dynamic(
  () => import('./ResumeForms/EducationForm').then((mod) => mod.EducationForm),
  {
    ssr: false,
  }
);

const DynamicQualificationForm = dynamic(
  () =>
    import('./ResumeForms/QualificationForm').then(
      (mod) => mod.QualificationForm
    ),
  {
    ssr: false,
  }
);

const ResumeAccordionList = [
  {
    formTitle: 'Personal Information',
    icon: <RxPerson size={30} />,
    formBody: <DynamicPersonalInformationForm />,
  },
  {
    formTitle: 'Work Experience',
    icon: <LuBuilding2 size={30} />,
    formBody: <DynamicWorkExperienceForm />,
  },
  {
    formTitle: 'Education',
    icon: <RiGraduationCapLine size={30} />,
    formBody: <DynamicEducationForm />,
  },
  {
    formTitle: 'Qualifications',
    icon: <GrDocumentText size={30} />,
    formBody: <DynamicQualificationForm />,
  },
];

export const ResumeFormList = () => {
  return (
    <div className="pb-5 w-full">
      {ResumeAccordionList.map((item) => (
        <ResumeAccordion
          key={item.formTitle}
          formTitle={item.formTitle}
          icon={item.icon}
          formBody={item.formBody}
        />
      ))}
    </div>
  );
};
