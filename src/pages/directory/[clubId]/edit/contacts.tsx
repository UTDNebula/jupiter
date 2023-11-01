/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import EditContactSelector from '@src/components/EditContactSelector';
import Header from '@src/components/Header';
import { LeftArrowIcon } from '@src/components/Icons';
import { api } from '@src/utils/api';
import { editClubSchema } from '@src/utils/formSchemas';
import { useRouter } from 'next/router';
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
const Page = () => {
  const router = useRouter();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<z.infer<typeof editClubSchema>>({
    resolver: zodResolver(editClubSchema),
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
  const clubQuery = api.club.byId.useQuery(
    {
      id: router.query['clubId'] as string,
    },
    {
      onSuccess: (data) => {
        reset({ contacts: data?.contacts }, { keepDefaultValues: false });
      },
      refetchOnWindowFocus: false,
    },
  );
  const [deleted, modifyDeleted] = useReducer(deletedReducer, []);
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <div className="flex h-full w-full flex-col gap-y-5 p-5">
          <div className="flex h-min flex-row align-middle">
            <button
              onClick={() => router.back()}
              type="button"
              className="box-content h-fit w-fit rounded-full bg-blue-primary p-2 hover:bg-blue-700 active:bg-blue-800"
            >
              <LeftArrowIcon />
            </button>
          </div>
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
                    reset({ contacts: clubQuery.data?.contacts });
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
        </div>
      </div>
    </main>
  );
};
export default Page;
