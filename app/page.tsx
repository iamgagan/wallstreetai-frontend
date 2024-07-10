"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll position
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // Check if user has scrolled to the bottom
      if (scrollTop + clientHeight >= scrollHeight) {
        // Navigate to the next page
        router.push("/login");
      }
    };

    // Attach event listener to the scroll event
    document.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [router]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold text-center text-white'>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
    </main>
  );
}
