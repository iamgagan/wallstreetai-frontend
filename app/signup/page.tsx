import { LoginForm } from "@/components/LoginForm/LoginForm";
import { SignUpForm } from "@/components/LoginForm/SignUp";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SignUpForm />
      <div className='absolute bottom-10 right-10'>
        <Button
          size='sm'
          variant='outline'
          className='bg-transparent border-zinc-50 text-white text-md font-normal px-6 rounded-lg italic'
        >
          continue as guest
        </Button>
      </div>
    </main>
  );
}
