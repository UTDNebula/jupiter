import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SettingsInput from '@src/components/settings/SettingsInput';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

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
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <SettingsInput
            label="First Name"
            defaultValue={session.user.firstName}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Last Name"
            defaultValue={session.user.lastName}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Major"
            defaultValue={session.user.major}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Minor"
            defaultValue={session.user.minor ?? ''}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Year"
            defaultValue={session.user.year}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Role"
            defaultValue={session.user.role}
            isEditing={isEditing}
          />
          <SettingsInput
            label="Career"
            defaultValue={session.user.career}
            isEditing={isEditing}
          />
          <p className="text-lg">Clubs:</p>
          <div>
            {session.user.clubs &&
              session.user.clubs.map((club) => {
                return (
                  <div key={club.id}>
                    {club.name} <p className="">{club.description}</p>
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
