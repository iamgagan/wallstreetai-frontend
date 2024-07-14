import { NavigationLayout } from "@/components/NavigationLayout/NavigationLayout";
import { LoginForm } from "@/components/AuthForm/LoginForm";

export default function Login() {
  return (
    <main className='min-h-screen w-full'>
      <NavigationLayout>
        <LoginForm />
      </NavigationLayout>
    </main>
  );
}
