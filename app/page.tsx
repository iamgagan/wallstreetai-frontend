"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className='flex flex-col items-center justify-center p-24 min-h-screen'
      onTouchMove={() => router.push("/login")}
      onWheel={() => router.push("/login")}
    >
      <h1 className='text-xl font-normal text-center text-white focus-in-expand-fwd tracking-wider'>
        {`The only platform you'll ever need to break into Wall Street.`}
      </h1>
    </main>
  );
}
