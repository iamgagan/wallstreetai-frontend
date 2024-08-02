'use client';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';
import { SignUpForm } from '@/components/AuthForm/SignUp';

export default function SignUp() {
  return (
    <NavigationLayout>
      <SignUpForm />
    </NavigationLayout>
  );
}
