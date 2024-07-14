import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";
import { SignUpForm } from "@/components/AuthForm/SignUp";

export default function SignUp() {
  return (
    <main className='min-h-screen w-full'>
      <NavigationLayout>
        <SignUpForm />
      </NavigationLayout>
    </main>
  );
}
