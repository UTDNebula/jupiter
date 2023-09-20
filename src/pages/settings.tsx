import { signIn, useSession } from 'next-auth/react';

const Settings = () => {
  const { data: session } = useSession();

  if (session) {
    <div className="pt-36">This is a protected page!</div>;
  }

  return (
    <main className="h-screen pl-72">
      <p className="pt-11 text-blue-600">you do not have access to this page</p>
      <button
        onClick={() => {
          signIn().catch((err) => {
            console.error(err);
          });
        }}
      >
        Sign in!
      </button>
    </main>
  );
};

export default Settings;
