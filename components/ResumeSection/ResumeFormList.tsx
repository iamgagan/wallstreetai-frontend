import { RxPerson } from "react-icons/rx";
import { ResumeAccordion } from "./ResumeAccordion";
import { PersonalInformationForm } from "./ResumeForms/PersonalInformationForm";
import { LuBuilding2 } from "react-icons/lu";
import { RiGraduationCapLine } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { WorkExperienceForm } from "./ResumeForms/WorkExperienceForm";
import { EducationForm } from "./ResumeForms/EducationForm";
import { QualificationForm } from "./ResumeForms/QualificationForm";

const ResumeAccordionList = [
  {
    formTitle: "Personal Information",
    icon: <RxPerson size={30} />,
    formBody: <PersonalInformationForm />,
  },
  {
    formTitle: "Work Experience",
    icon: <LuBuilding2 size={30} />,
    formBody: <WorkExperienceForm />,
  },
  {
    formTitle: "Education",
    icon: <RiGraduationCapLine size={30} />,
    formBody: <EducationForm />,
  },
  {
    formTitle: "Qualifications",
    icon: <GrDocumentText size={30} />,
    formBody: <QualificationForm />,
  },
];

export const ResumeFormList = () => {
  return (
    <div className='pb-5 w-full'>
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
