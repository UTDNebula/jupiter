'use client';
import { insertUserMetadata } from '@src/server/db/models';
import { api } from '@src/trpc/react';
import { type Session } from 'next-auth';
import { type FC, useEffect } from 'react';
import SettingsInput from './SettingsInput';
import SettingsDropdown from './SettingsDropdown';
import { careerEnum, roleEnum, yearEnum } from '@src/server/db/schema';

const SettingsForm: FC<{ session: Session }> = ({ session }) => {
  const { mutate, isLoading, isSuccess, isError, reset } =
    api.userMetadata.updateById.useMutation();

  useEffect(() => {
    if (isSuccess || isError)
      setTimeout(() => {
        reset();
      }, 2000);
  });
  return (
    <>
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
        <SettingsInput label="Last Name" defaultValue={session.user.lastName} />
        <SettingsInput label="Major" defaultValue={session.user.major} />
        <SettingsInput label="Minor" defaultValue={session.user.minor ?? ''} />
        <SettingsDropdown
          label="Year"
          options={yearEnum.enumValues}
          defaultValue={session.user.year ?? ''}
        />
        <SettingsDropdown
          label="Role"
          options={roleEnum.enumValues}
          defaultValue={session.user.role ?? ''}
          disabled
        />
        <SettingsDropdown
          label="Career"
          options={careerEnum.enumValues}
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
    </>
  );
};

export default SettingsForm;
