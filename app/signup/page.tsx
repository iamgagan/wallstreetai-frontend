import { LoginForm } from "@/components/LoginForm/LoginForm";
import { SignUpForm } from "@/components/LoginForm/SignUp";

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SignUpForm />
    </main>
  );
}
