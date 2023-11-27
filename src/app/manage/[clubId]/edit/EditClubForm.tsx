'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import { type SelectClub, type SelectContact } from '@src/server/db/models';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const editClubSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
});
const EditClubForm = ({
  club,
}: {
  club: SelectClub & { contacts: SelectContact[] };
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof editClubSchema>>({
    resolver: zodResolver(editClubSchema),
    defaultValues: {
      name: club.name,
      description: club.description,
    },
  });
  const submitForm = handleSubmit((data) => {
    //form data is in data
    console.log(data);
  });
  return (
    <form onSubmit={submitForm}>
      <div className="flex h-full w-full flex-col gap-y-5">
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h1 className="text-xl font-extrabold text-black">
            Edit Organization
          </h1>
        </div>
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h2 className="text-lg font-extrabold">Organization name</h2>
          <input
            type="text"
            id="name"
            className=" w-full bg-transparent"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="h-44 w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h2 className="text-lg font-extrabold">Description</h2>
          <textarea
            id="desc"
            className="h-24 w-full bg-transparent"
            {...register('description')}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-row justify-end gap-x-4 py-2">
          <button className="rounded-lg bg-slate-200 p-1 font-bold">
            Save Changes
          </button>
          <button
            type="button"
            onClickCapture={() => {
              reset({
                name: club.name,
                description: club.description,
              });
            }}
            disabled={!isDirty}
            className="group relative rounded-lg bg-slate-200 p-1 font-bold"
          >
            <div className="invisible absolute inset-0 h-full w-full rounded-lg bg-black opacity-80 group-disabled:visible"></div>
            <div>Discard Changes</div>
          </button>
        </div>
      </div>
    </form>
  );
};
export default EditClubForm;
