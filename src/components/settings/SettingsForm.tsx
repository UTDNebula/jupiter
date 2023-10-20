import { type Session } from 'next-auth';
import { type FC } from 'react';
import SettingsInput from './SettingsInput';
import SettingsDropdown from './SettingsDropdown';
import {
  careerEnum,
  roleEnum,
  userMetadata,
  yearEnum,
} from '@src/server/db/schema';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { insertUserMetadata } from '@src/server/db/models';
import { revalidatePath } from 'next/cache';

const SettingsForm: FC<{ session: Session }> = ({ session }) => {
  async function updateUser(formData: FormData) {
    'use server';
    const updated = insertUserMetadata
      .omit({ id: true })
      .parse(Object.fromEntries(formData.entries()));
    await db
      .update(userMetadata)
      .set(updated)
      .where(eq(userMetadata.id, session.user.id));

    revalidatePath('/settings');
  }

  return (
    <>
      <form
        id="settings-form"
        className="flex flex-col gap-4"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        action={updateUser}
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
      <button
        type="submit"
        form="settings-form"
        className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
      >
        Save Changes
      </button>
    </>
  );
};

export default SettingsForm;
