/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@src/server/auth';
import AuthIcons from '@src/icons/AuthIcons';
import Link from 'next/link';
import { env } from '@src/env.mjs';

export default function SignIn({ providers }: { providers: Providers }) {
  console.log(providers);

  return (
    <main className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-[#ffffff] md:pl-72">
      <h1 className="text-2xl text-slate-800">Sign in</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            {AuthIcons[provider.id]}
          </button>
        </div>
      ))}
      <h4>
        Don't have an account?{' '}
        <Link
          className="font-semibold text-slate-500 hover:underline"
          href={'/auth/signup'}
        >
          {'Sign up'}
        </Link>
      </h4>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const res = await fetch(`${env.NEXTAUTH_URL}/api/auth/providers`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const providers: Providers = await res.json();

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
