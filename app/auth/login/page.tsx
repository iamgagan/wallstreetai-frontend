'use client';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { LoginForm } from '@/components/AuthForm/LoginForm';

export default function Login() {
  return (
    <NavigationLayout>
      <LoginForm />
    </NavigationLayout>
  );
}
