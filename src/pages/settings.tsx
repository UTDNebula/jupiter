import { useSession } from 'next-auth/react';
import SettingsInput from '@src/components/settings/SettingsInput';
import { api } from '@src/utils/api';
import IUserMetadata from '@src/models/userMetadata';
import { insertUserMetadata } from '@src/server/db/models';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Image from 'next/image';

const Settings = () => {
  const { data: session } = useSession();
  const { isLoading, isError, isSuccess, mutate, reset } =
    api.userMetadata.updateById.useMutation();

  useEffect(() => {
    // let timeout: NodeJS.Timeout;
    if (isSuccess || isError)
      setTimeout(() => {
        reset();
      }, 2000);

    // return () => {
    //   console.log('clearing');
    //   clearTimeout(timeout);
    // };
  });

  if (!session) {
    return (
      <>
        <Head>
          <title>Jupiter</title>
          <meta name="description" content="Settings - Jupiter" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-full md:pl-72">
          <Header />
          <div className="w-full pt-20 flex items-center place-content-center">
            <Image
              src="/nebula-logo.png"
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div className="h-full">
            <h1 className=" pt-5 text-3xl font-bold text-black-500 text-center">
              Please signin to use the settings page.
            </h1>
          </div>
        </main>
      </>
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
        <form
          id="settings-form"
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;

            const formData = new FormData(form);

            const updatedMetadata = insertUserMetadata
              .omit({ id: true })
              .parse(Object.fromEntries(formData.entries()));

            mutate({
              id: session.user.id,
              updatedMetadata,
            });
          }}
        >
          <SettingsInput
            label="First Name"
            defaultValue={session.user.firstName}
          />
          <SettingsInput
            label="Last Name"
            defaultValue={session.user.lastName}
          />
          <SettingsInput label="Major" defaultValue={session.user.major} />
          <SettingsInput
            label="Minor"
            defaultValue={session.user.minor ?? ''}
          />
          <SettingsInput label="Year" defaultValue={session.user.year ?? ''} />
          <SettingsInput label="Role" defaultValue={session.user.role ?? ''} />
          <SettingsInput
            label="Career"
            defaultValue={session.user.career ?? ''}
          />
          <p className="text-lg">Clubs:</p>
          <div>
            {session.user.clubs &&
              session.user.clubs.map((club) => {
                return (
                  <div key={club.id}>
                    <h1>{club.name}</h1> <p className="">{club.description}</p>
                  </div>
                );
              })}
          </div>
        </form>

        {isLoading && (
          <div className="fixed bottom-20 right-32 h-auto animate-pulse rounded-md border border-slate-200 bg-slate-50 p-2">
            Loading...
          </div>
        )}

        {isSuccess && (
          <div className="fixed bottom-20 right-32 h-auto rounded-md border border-green-200 bg-green-50 p-2">
            Success!
          </div>
        )}
        {isError && (
          <div className="fixed bottom-20 right-32 h-auto rounded-md border border-red-200 bg-red-50 p-2">
            Error
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;