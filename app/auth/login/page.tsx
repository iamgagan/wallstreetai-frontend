import { Layout } from "@/components/Layout/Layout";
import { LoginForm } from "@/components/AuthForm/LoginForm";

export default function Login() {
  return (
    <main className='min-h-screen w-full'>
      <Layout>
        <LoginForm />
      </Layout>
    </main>
  );
}
