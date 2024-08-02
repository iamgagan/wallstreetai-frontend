'use client';
import { Logo } from '@/components/Logo/Logo';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useUserStore } from '@/store/store';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const { updateIsLoggedIn, updateEmail } = useUserStore();

  useEffect(() => {
    if (status === 'authenticated') {
      signOut().then(() => {
        updateIsLoggedIn(false);
        updateEmail('');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <main
      className="cover flex min-h-screen flex-col items-center justify-center p-24"
      onTouchMove={() => router.push('/auth/login')}
      onWheel={() => router.push('/auth/login')}
    >
      <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
        <Logo background="dark" />
      </div>
      <h1 className="focus-in-expand-fwd text-center text-xl font-normal tracking-wider text-white">
        {`The only platform you'll ever need to break into Wall Street.`}
      </h1>
    </main>
  );
}
