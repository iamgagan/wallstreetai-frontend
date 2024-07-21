import { auth, signOut } from '@/auth';
import { NavigationLayout } from '@/components/NavigationLayout/NavigationLayout';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <main className="min-h-screen w-full">
      <NavigationLayout>
        <div className="text-center">
          <p>{JSON.stringify(session)}</p>

          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </div>
      </NavigationLayout>
    </main>
  );
};

export default SettingsPage;
