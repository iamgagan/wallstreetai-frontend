import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";

const menuItemList = [
  "resume generator",
  "resume score",
  "mock interview",
  "career insights",
  "ask ai",
];

export default function Dashboard() {
  return (
    <main className='min-h-screen w-full'>
      <NavigationLayout>
        <p>Dashboard</p>
      </NavigationLayout>
    </main>
  );
}
