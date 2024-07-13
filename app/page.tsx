"use client";
import { Logo } from "@/components/Logo/Logo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className='flex flex-col items-center justify-center p-24 min-h-screen cover'
      onTouchMove={() => router.push("/login")}
      onWheel={() => router.push("/login")}
    >
      <div className='absolute top-2 left-2 sm:top-6 sm:left-6'>
        <Logo background='dark' />
      </div>
      <h1 className='text-xl font-normal text-center text-white focus-in-expand-fwd tracking-wider'>
        {`The only platform you'll ever need to break into Wall Street.`}
      </h1>
    </main>
  );
}
