import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Card } from '../ui/card';

interface ResumeAccordionProps {
  formTitle: string;
  icon: React.ReactNode;
  formBody: React.ReactNode;
}

export const ResumeAccordion = ({
  formTitle,
  icon,
  formBody,
}: ResumeAccordionProps) => {
  return (
    <Card className="w-full px-5">
      <Accordion type="single" collapsible className="w-[90%] mx-auto h-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center">
            <header className="flex gap-8 items-center py-auto">
              {icon}
              <h2 className="font-bold text-xl text-center">{formTitle}</h2>
            </header>
          </AccordionTrigger>
          <AccordionContent>{formBody}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
