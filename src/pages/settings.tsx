import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SettingsInput from '@src/components/settings/SettingsInput';
import { api } from '@src/utils/api';
import IUserMetadata, { UserMetadata } from '@src/models/userMetadata';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const mutation = api.userMetadata.updateById.useMutation();

  if (!session) {
    return (
      <div className="flex h-screen w-full items-center justify-center md:pl-72">
        <div className="absolute  rounded-lg bg-red-300 p-4 text-lg text-white">
          Make sure you are logged in!
        </div>
      </div>
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
            onClick={(e) => {
              setIsEditing((editing) => !editing);
            }}
            className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </button>
        </div>
        <form
          id="settings-form"
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Editing?', isEditing);
            // if (!isEditing) return;
            const form = e.currentTarget;

            const formData = new FormData(form);

            const userMetadata = IUserMetadata.parse(
              Object.fromEntries(formData.entries()),
            );

            console.log('new:', userMetadata);

            mutation.mutate({
              id: session.user.id,
              updatedMetadata: userMetadata,
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
      </div>
    </div>
  );
};

export default Settings;
