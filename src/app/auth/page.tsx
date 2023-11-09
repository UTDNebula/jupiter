import ProviderButton from '@src/components/ProviderButtons';
import { getServerAuthSession } from '@src/server/auth';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Auth({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const session = await getServerAuthSession();
  if (session) {
    return redirect(searchParams['callbackUrl'] ?? '/');
  }
  const signin = searchParams.signup !== '';
  const providers = await getProviders();

  return (
    <main className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-[#ffffff] md:pl-72">
      <h1 className="text-2xl text-slate-800">
        {signin ? 'Sign in' : 'Sign up'}
      </h1>
      {Object.values(providers || {}).map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
      <h4>
        {signin ? (
          <Link
            href="/auth?signup"
            className="font-semibold text-slate-500 hover:underline"
          >
            Don&apos;t have an account?{' '}
          </Link>
        ) : (
          <Link
            href="/auth"
            className="font-semibold text-slate-500 hover:underline"
          >
            Already have an account?{' '}
          </Link>
        )}
      </h4>
    </main>
  );
}
