"use client";
import { Logo } from "../Logo/Logo";
import { Button } from "../ui/button";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const { status } = useSession();
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  return (
    <main className='flex flex-col justify-center items-center gap-5 w-full h-full'>
      <header className='w-full py-2 sm:py-4 shadow-md bg-[#fafafa]'>
        <div className='flex justify-between px-2 sm:px-6'>
          <div>
            <Logo background='light' />
          </div>

          {status === "authenticated" || isLoggedIn ? (
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
