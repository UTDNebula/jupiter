import Header from '@src/components/BaseHeader';
import Image from 'next/image';
import { getServerAuthSession } from '@src/server/auth';
import SettingsForm from '@src/components/settings/SettingsForm';

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
    <div className="my-10 flex h-screen w-full flex-col items-center justify-center md:pl-72">
      <div className="min-h-3/4 w-3/4 rounded-xl bg-slate-50 p-20 shadow-lg">
        <div className="flex justify-between py-2">
          <h1 className="text-2xl">Settings</h1>
          <button
            type="submit"
            form="settings-form"
            className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
        <SettingsForm session={session} />
      </div>
    </div>
  );
};

export default Settings;
