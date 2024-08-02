'use client';
import { Logo } from '../Logo/Logo';
import { Button } from '../ui/button';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { useEffect } from 'react';
import { Resume, ResumeFile } from '@/types/Resume';

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const { status, data } = useSession();
  const { email, isLoggedIn, updateResumes, updateResumeFiles, updateUserId } =
    useUserStore();
  const router = useRouter();

  const updateUserDetails = (
    id: string | null | undefined,
    resumes: Resume[] | null | undefined,
    resumeFiles: ResumeFile[] | null | undefined
  ) => {
    if (id) {
      updateUserId(id);
    }
    if (resumes) {
      updateResumes(resumes);
    }
    if (resumeFiles) {
      updateResumeFiles(resumeFiles);
    }
  };

  useEffect(() => {
    if (data && data.user) {
      // get user data from session
      const { id, resumes, resumeFiles } = data.user;
      updateUserDetails(id, resumes, resumeFiles);
    } else {
      // else get user data from db
      if (email) {
        fetch(`/api/user?email=${email}`).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              if (data) {
                const {
                  user: { id, resumes, resumeFiles },
                } = data;
                updateUserDetails(id, resumes, resumeFiles);
              }
            });
          }
        });
      }
    }
  }, [data, data?.user, email]);

  return (
    <main className="flex flex-col justify-start items-center gap-5 w-full h-full overflow-y-scroll">
      <header className="w-full min-h-[80px] flex items-center shadow-md bg-[#fafafa] justify-center fixed">
        <div className="max-w-[95vw] flex items-center justify-between w-full">
          <div>
            <Logo background="light" />
          </div>

          {status === 'authenticated' || isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-md font-normal px-6 rounded-lg italic"
              onClick={() => router.push('/dashboard')}
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
