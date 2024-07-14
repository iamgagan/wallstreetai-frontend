"use client";

import { Card } from "flowbite-react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  title: string;
  description: string;
  bgColor: string;
  icon: StaticImageData;
}

export const DashboardCard = ({
  bgColor,
  title,
  description,
  icon,
}: DashboardCardProps) => {
  const router = useRouter();
  return (
    <Card
      className={`w-[8rem] h-[8rem] lg:w-[15rem] lg:h-[12rem] rounded-xl ${bgColor} cursor-pointer`}
    >
      <div className='flex flex-col lg:flex-row justify-between gap-3 items-center w-full'>
        <Image
          src={icon}
          alt='resume'
          className='w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]'
        />
        <h5 className='text-sm lg:text-md font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
      </div>
      <p className='hidden lg:block text-sm font-normal text-gray-700 dark:text-gray-400'>
        {description}
      </p>
    </Card>
  );
};
