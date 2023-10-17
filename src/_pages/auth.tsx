import type { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@src/server/auth';
import AuthIcons from '@src/icons/AuthIcons';
import { getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Auth({ providers }: { providers: Providers }) {
  const router = useRouter();
  const [signin, setSignin] = useState(true);

  const toggleAuthType = () => {
    setSignin((signIn) => !signIn);
  };

  useEffect(() => {
    if (router.query.signup === '') {
      setSignin(false)
    }
  }, [router.query.signup]); 

  return (
    <main className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-[#ffffff] md:pl-72">
      <h1 className="text-2xl text-slate-800">
        {signin ? 'Sign in' : 'Sign up'}
      </h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => void signIn(provider.id)}>
            {AuthIcons[provider.id]}
          </button>
        </div>
      ))}
      <h4>
        {signin ? "Don't have an account? " : 'Already have an account? '}
        <button
          className="font-semibold text-slate-500 hover:underline"
          onClick={toggleAuthType}
        >
          {signin ? 'Sign up' : 'Sign in'}
        </button>
      </h4>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type Providers = {
  [key: string]: Provider;
};
