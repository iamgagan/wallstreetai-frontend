'use client'
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { DashboardCard } from '@/components/DashboardCard/DashboardCard';
import Link from 'next/link';
import { ResumeSection } from '@/components/ResumeSection/ResumeSection';
import { useSession } from "next-auth/react";
import { useUserStore } from '@/store/store';
import { useEffect } from 'react';

const cardList = [
  {
    title: 'Create your first resume',
    description: 'Craft a winning resume for your Wall Street ambitions!',
    bgColor: 'bg-card-blue',
    icon: '/cv.png',
    navigateTo: '/resumes',
  },
  {
    title: 'Resume analysis',
    description: 'Get your resume analyzed by our AI to improve your chances!',
    bgColor: 'bg-card-green',
    icon: '/score.png',
    navigateTo: '/resume-analysis',
  },
  {
    title: 'Career insights',
    description: 'Empower your career with insights from industry experts!',
    bgColor: 'bg-card-red',
    icon: '/insights.png',
    navigateTo: '/career-insights',
  },
  {
    title: 'Mock interviews',
    description: 'Prepare for your dream job with mock interviews!',
    bgColor: 'bg-card-purple',
    icon: '/interview.png',
    navigateTo: '/mock-interviews',
  },
];

export default function Dashboard() {
  const { data } = useSession();
  const { updateUserId, updateResumeFiles } = useUserStore();

  useEffect(() => {
    if (data && data.user) {
      if (data.user.id) {
        updateUserId(data.user.id);
      }
      if(data.user.resumeFiles) {
        updateResumeFiles(data.user.resumeFiles)
      }
    }
  },[data?.user?.id]);

  return (
    <NavigationLayout>
      <ul className="flex gap-3 justify-between w-full max-w-[80vw] mt-[100px]">
        {cardList.map((card) => (
          <Link key={card.title} href={card.navigateTo}>
            <DashboardCard {...card} />
          </Link>
        ))}
      </ul>
      <ResumeSection />
    </NavigationLayout>
  );
}
