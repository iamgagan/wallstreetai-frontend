import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import cv from "../../public/cv.png";
import insights from "../../public/insights.png";
import score from "../../public/score.png";
import interview from "../../public/interview.png";

const cardList = [
  {
    title: "Create your first resume",
    description: "Craft a winning resume for your Wall Street ambitions!",
    bgColor: "bg-card-blue",
    icon: cv,
  },
  {
    title: "Resume analysis",
    description: "Get your resume analyzed by our AI to improve your chances!",
    bgColor: "bg-card-green",
    icon: score,
  },
  {
    title: "Career insights",
    description: "Empower your career with insights from industry experts!",
    bgColor: "bg-card-red",
    icon: insights,
  },
  {
    title: "Mock interviews",
    description: "Prepare for your dream job with mock interviews!",
    bgColor: "bg-card-purple",
    icon: interview,
  },
];

export default function Dashboard() {
  return (
    <main className='min-h-screen w-full'>
      <NavigationLayout>
        <ul className='flex gap-3'>
          {cardList.map((card, index) => (
            <li key={card.title}>
              <DashboardCard {...card} />
            </li>
          ))}
        </ul>
      </NavigationLayout>
    </main>
  );
}
