import Header from '@src/components/BaseHeader';
import Image from 'next/image';
import { getServerAuthSession } from '@src/server/auth';
import SettingsForm from '@src/components/settings/SettingsForm';
import { type Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Settings - Jupiter',
  description: 'Settings for your Jupiter account',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/settings',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/settings',
    description: 'Settings - Jupiter',
  },
};
const Settings = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main className="h-full md:pl-72">
        <Header />
        <div className="flex w-full place-content-center items-center pt-20">
          <Image src="/nebula-logo.png" alt="" width={300} height={300} />
        </div>
        <div className="h-full">
          <h1 className=" text-black-500 pb-1 pt-5 text-center text-3xl font-bold">
            Please Sign in to Use the Settings Page.
          </h1>
        </div>
      </main>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center md:pl-72">
      <Header />
      <SettingsForm session={session} />
    </div>
  );
};

export default Settings;
3;
