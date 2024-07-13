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
    <Card className='w-[90vw] mx-auto min-w-[380px] sm:w-[35vw]'>
      {headerLabel ? (
        <CardHeader>
          <CardTitle>{headerLabel}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className='rounded-b-lg'>
        {children}
        {footerLabel ? (
          <CardFooter className='text-black pt-4'>{footerLabel}</CardFooter>
        ) : null}
      </CardContent>
    </Card>
  );
};
