/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import EditContactSelector from '@src/components/EditContactSelector';
import { type SelectClub, type SelectContact } from '@src/server/db/models';
import { editClubSchema } from '@src/utils/formSchemas';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

type formData = z.infer<typeof editClubSchema>;
type x = {
  platform?: boolean | undefined;
  url?: boolean | undefined;
  clubId?: boolean | undefined;
}[];
const modifiedFields = (dirtyFields: x, data: formData) => {
  const modded = data.contacts.filter(
    (value, index) =>
      Object.values(dirtyFields[index] ?? {}).reduce(
        (previous, current) => previous || current,
      ) && value.clubId,
  );
  const created = data.contacts.filter(
    (value, index) =>
      Object.values(dirtyFields[index] ?? {}).reduce(
        (previous, current) => previous || current,
      ) && !value.clubId,
  );
  return { modified: modded, created: created };
};

export type modifyDeletedAction =
  | {
      type: 'add';
      target: string;
    }
  | { type: 'reset' };
const deletedReducer = (state: Array<string>, action: modifyDeletedAction) => {
  switch (action.type) {
    case 'add':
      return [...state, action.target];
    case 'reset':
      return [];
  }
};
export default function EditContactForm({
  club,
}: {
  club: SelectClub & { contacts: SelectContact[] };
}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<z.infer<typeof editClubSchema>>({
    resolver: zodResolver(editClubSchema),
    defaultValues: {
      contacts: club.contacts,
    },
  });
  const submitForm = handleSubmit((data) => {
    console.log(data);
    if (dirtyFields.contacts !== undefined) {
      const { modified, created } = modifiedFields(dirtyFields.contacts, data);
      console.log({
        deleted: deleted,
        modified: modified,
        created: created,
      });
    }
  });
  const [deleted, modifyDeleted] = useReducer(deletedReducer, []);
  return (
    <div className="container w-full rounded-md bg-slate-100 p-5 shadow-sm">
      <form onSubmit={submitForm}>
        <div>
          <EditContactSelector
            control={control}
            register={register}
            errors={errors}
            modifyDeleted={modifyDeleted}
          />
        </div>
        <div className="flex flex-row justify-end gap-x-4 py-2">
          <button className="rounded-lg bg-slate-200 p-1 font-bold">
            Save Changes
          </button>
          <button
            type="button"
            onClickCapture={() => {
              reset({ contacts: club.contacts });
              modifyDeleted({ type: 'reset' });
            }}
            disabled={!isDirty}
            className="group relative rounded-lg bg-slate-200 p-1 font-bold"
          >
            <div className="invisible absolute inset-0 h-full w-full rounded-lg bg-black opacity-80 group-disabled:visible"></div>
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
}
