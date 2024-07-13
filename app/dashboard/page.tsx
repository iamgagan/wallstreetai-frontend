import { Layout } from "@/components/Layout/Layout";

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
      <Layout>
        <p>Dashboard</p>
      </Layout>
    </main>
  );
}
