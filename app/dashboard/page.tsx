import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import cv from "../../public/cv.png";
import insights from "../../public/insights.png";
import score from "../../public/score.png";
import interview from "../../public/interview.png";
import Link from "next/link";

const cardList = [
  {
    title: "Create your first resume",
    description: "Craft a winning resume for your Wall Street ambitions!",
    bgColor: "bg-card-blue",
    icon: "/cv.png",
    navigateTo: "/resumes",
  },
  {
    title: "Resume analysis",
    description: "Get your resume analyzed by our AI to improve your chances!",
    bgColor: "bg-card-green",
    icon: "/score.png",
    navigateTo: "/resume-analysis",
  },
  {
    title: "Career insights",
    description: "Empower your career with insights from industry experts!",
    bgColor: "bg-card-red",
    icon: "/insights.png",
    navigateTo: "/career-insights",
  },
  {
    title: "Mock interviews",
    description: "Prepare for your dream job with mock interviews!",
    bgColor: "bg-card-purple",
    icon: "/interviews.png",
    navigateTo: "/mock-interviews",
  },
];

export default function Dashboard() {
  return (
    <main className='min-h-screen w-full'>
      <NavigationLayout>
        <ul className='flex gap-3'>
          {cardList.map((card, index) => (
            <Link key={card.title} href={card.navigateTo}>
              <DashboardCard {...card} />
            </Link>
          ))}
        </ul>
      </NavigationLayout>
    </main>
  );
}
