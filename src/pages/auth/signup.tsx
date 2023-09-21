/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@src/server/auth';
import AuthIcons from '@src/icons/AuthIcons';
import Link from 'next/link';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-[#ffffff] md:pl-72">
      <h1 className="text-2xl text-slate-800">Sign up</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            {AuthIcons[provider.id]}
          </button>
        </div>
      ))}
      <h4>
        Already have an account?{' '}
        <Link
          className="font-semibold text-slate-500 hover:underline"
          href={'/auth/signin'}
        >
          {'Sign in'}
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

  const providers = await fetch('/api/auth/providers');

  return {
    props: { providers: providers.json() ?? [] },
  };
}
