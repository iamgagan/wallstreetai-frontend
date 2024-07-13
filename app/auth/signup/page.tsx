import { Layout } from "@/components/Layout/Layout";
import { SignUpForm } from "@/components/AuthForm/SignUp";

export default function SignUp() {
  return (
    <main className='min-h-screen w-full'>
      <Layout loggedIn={false}>
        <SignUpForm />
      </Layout>
    </main>
  );
}
