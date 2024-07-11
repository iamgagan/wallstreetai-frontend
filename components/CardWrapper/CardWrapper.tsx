"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  footerLabel?: string | React.ReactNode;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  footerLabel,
}) => {
  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle className='text-white'>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent className='py-6 bg-[#cfd8ff] rounded-b-lg'>
        {children}
        {footerLabel ? (
          <CardFooter className='text-black pt-4'>{footerLabel}</CardFooter>
        ) : null}
      </CardContent>
    </Card>
  );
};
