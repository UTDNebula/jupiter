/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSearchBar } from '@src/components/SearchBar';
import { api } from '@src/trpc/react';
import { editOfficerSchema } from '@src/utils/formSchemas';
import { useRouter } from 'next/navigation';
import { useReducer } from 'react';
import {
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { type z } from 'zod';

type x = {
  name?: boolean | undefined;
  position?: boolean | undefined;
}[];
const modifiedFields = (
  dirtyFields: x,
  data: z.infer<typeof editOfficerSchema>,
  officers: {
    userId: string;
    name: string;
    locked: boolean;
    position: string;
  }[],
) => {
  const modded = data.officers.filter(
    (value, index) =>
      Object.values(dirtyFields[index] ?? {}).reduce(
        (previous, current) => previous || current,
      ) && !!officers.find((off) => off.userId === value.userId),
  );
  const created = data.officers.filter(
    (value, index) =>
      Object.values(dirtyFields[index] ?? {}).reduce(
        (previous, current) => previous || current,
      ) && !officers.find((off) => off.userId === value.userId),
  );
  return {
    modified: modded.map((officer) => {
      return { userId: officer.userId, title: officer.position };
    }),
    created: created.map((officer) => {
      return { userId: officer.userId, title: officer.position };
    }),
  };
};

type modifyDeletedAction =
  | {
      type: 'add';
      target: z.infer<typeof editOfficerSchema>['officers'][number]['userId'];
    }
  | { type: 'reset' };
const deletedReducer = (
  state: Array<z.infer<typeof editOfficerSchema>['officers'][number]['userId']>,
  action: modifyDeletedAction,
) => {
  switch (action.type) {
    case 'add':
      return [...state, action.target];
    case 'reset':
      return [];
  }
};

type EditOfficerFormProps = {
  clubId: string;
  officers: {
    userId: string;
    name: string;
    locked: boolean;
    position: string;
  }[];
};
const EditOfficerForm = ({ clubId, officers }: EditOfficerFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<z.infer<typeof editOfficerSchema>>({
    resolver: zodResolver(editOfficerSchema),
    defaultValues: { officers: officers },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'officers',
  });
  const [deleted, modifyDeleted] = useReducer(deletedReducer, []);
  const removeItem = (index: number, userId: string) => {
    if (officers.find((officer) => officer.userId == userId))
      modifyDeleted({ type: 'add', target: userId });
    remove(index);
  };
  const router = useRouter();
  const editOfficers = api.club.edit.officers.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const submitForm = handleSubmit((data) => {
    if (dirtyFields.officers !== undefined) {
      const { modified, created } = modifiedFields(
        dirtyFields.officers,
        data,
        officers,
      );
      if (!editOfficers.isLoading) {
        editOfficers.mutate({
          clubId: clubId,
          deleted: deleted,
          modified: modified,
          created: created,
        });
      }
    }
  });
  return (
    <div className="h-full w-full">
      <form onSubmit={submitForm}>
        <div className="flex flex-col gap-y-2">
          <div>
            <UserSearchBar
              passUser={(user) => {
                append({
                  userId: user.id,
                  name: user.name,
                  position: '',
                  locked: false,
                });
              }}
            />
          </div>
          <div>
            {errors.officers && (
              <p className="text-red-500">{errors.officers.message}</p>
            )}
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <OfficerItem
                key={field.id}
                register={register}
                index={index}
                id={field.userId}
                remove={removeItem}
                errors={errors}
                locked={field.locked}
                name={field.name}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-x-4 py-2">
          <button
            className="rounded-lg bg-slate-200 p-1 font-bold"
            type="submit"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClickCapture={() => {
              reset({
                officers: officers,
              });
            }}
            disabled={!isDirty}
            className="group relative rounded-lg bg-slate-200 p-1 font-bold"
          >
            <div className="invisible absolute inset-0 h-full w-full rounded-lg bg-black opacity-80 group-disabled:visible"></div>
            <div>Discard Changes</div>
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditOfficerForm;
type OfficerItemProps = {
  register: UseFormRegister<z.infer<typeof editOfficerSchema>>;
  remove: (index: number, userId: string) => void;
  id: string;
  index: number;
  name: string;
  locked: boolean;
  errors: FieldErrors<z.infer<typeof editOfficerSchema>>;
};
const OfficerItem = ({
  register,
  index,
  id,
  name,
  remove,
  errors,
  locked,
}: OfficerItemProps) => {
  return (
    <div className="flex flex-row items-center rounded-md bg-slate-300 p-2">
      <div className="flex flex-col">
        <div>
          <h4 className="mb-1 bg-slate-300 text-xl font-bold text-black">
            {name}
          </h4>
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            className="bg-slate-300 font-semibold text-black"
            {...register(`officers.${index}.position` as const)}
            aria-invalid={errors.officers && !!errors.officers[index]?.position}
            disabled={locked}
          />
          {errors.officers && errors.officers[index]?.position && (
            <p className="text-red-500">
              {errors.officers[index]?.position?.message}
            </p>
          )}
        </div>
      </div>
      <button
        className="ml-auto disabled:hidden"
        type="button"
        onClick={() => remove(index, id)}
        disabled={locked}
      >
        remove
      </button>
    </div>
  );
};