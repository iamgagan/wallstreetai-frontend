import { MenuButton } from "@/components/MenuButton/MenuButton";

const menuItemList = [
  "resume generator",
  "resume score",
  "mock interview",
  "career insights",
  "ask ai",
];

export default function Dashboard() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 w-full'>
      <div className='fixed right-0 flex flex-col gap-6'>
        {menuItemList.map((item) => (
          <MenuButton key={item} buttonLabel={item} />
        ))}
      </div>
    </main>
  );
}
