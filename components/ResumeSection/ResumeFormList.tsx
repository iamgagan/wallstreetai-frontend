import { Card } from "../ui/card";
import { RxPerson } from "react-icons/rx";
import { ResumeAccordion } from "./ResumeAccordion";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { LuBuilding2 } from "react-icons/lu";
import { RiGraduationCapLine } from "react-icons/ri";
import { GrDocumentText } from "react-icons/gr";
import { WorkExperienceForm } from "./WorkExperienceForm";
import { EducationForm } from "./EducationForm";
import { QualificationForm } from "./QualificationForm";

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
    <div className='pt-3 pb-5 mt-[100px]'>
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
