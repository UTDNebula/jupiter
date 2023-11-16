import ProviderButton from '@src/components/ProviderButtons';
import { getServerAuthSession } from '@src/server/auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@src/components/backButton';

export default async function Auth({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const session = await getServerAuthSession();
  if (session) {
    return redirect(searchParams['callbackUrl'] ?? '/');
  }
  const providers = await getProviders();

  return (
    <main className="h-screen md:pl-72">
      <div className="relative flex h-screen basis-full flex-col items-center justify-center">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image src={'/banner.png'} alt="background" fill objectFit="cover" />
        </div>
        <div className="flex flex-col gap-16">
          <div className="z-10 flex w-fit">
            <BackButton />
          </div>
          <div className="z-10 flex flex-col items-center justify-center space-y-12">
            <h1 className="text-6xl font-bold text-white">Sign In / Sign Up</h1>
            <div className="flex w-full flex-row justify-center gap-x-4 py-2.5">
              {Object.values(providers || {}).map((provider) => (
                <ProviderButton key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
