import { getServerAuthSession } from '@src/server/auth';
import SettingsForm from '@src/components/settings/SettingsForm';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
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
    redirect('/auth');
  }

  return (
    <div className="my-auto flex h-screen w-full flex-col items-center justify-center md:pl-72">
      <SettingsForm session={session} />
    </div>
  );
};

export default Settings;
3;
