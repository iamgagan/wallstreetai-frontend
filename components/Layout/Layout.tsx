"use client";
import { Logo } from "../Logo/Logo";
import { Button } from "../ui/button";
import { ProfileMenu } from "../ProfileCard/ProfileCard";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  return (
    <main className='flex flex-col justify-center items-center gap-5 w-full h-full'>
      <header className='w-full py-2 sm:py-4 shadow-md bg-[#fafafa]'>
        <div className='flex justify-between px-2 sm:px-6'>
          <div>
            <Logo background='light' />
          </div>

          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Button
              size='sm'
              variant='outline'
              className='text-md font-normal px-6 rounded-lg italic'
              onClick={() => router.push("/dashboard")}
            >
              continue as guest
            </Button>
          )}
        </div>
      </header>
      {children}
    </main>
  );
};
