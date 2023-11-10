'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import ContactSelector from '@src/components/CreateContactSelector';
import OfficerSelector from '@src/components/OfficerSelector';
import { createClubSchema } from '@src/utils/formSchemas';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

const CreateClubForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createClubSchema>>({
    resolver: zodResolver(createClubSchema),
  });
  const submitForm = handleSubmit((data) => {
    //form data is in data
    console.log(data);
  });
  return (
    <form onSubmit={submitForm}>
      <div className="flex h-full w-full flex-col gap-y-5 p-5">
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h1 className="text-lg font-extrabold text-black">
            Create new Organization
          </h1>
        </div>
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h2>Organization name</h2>
          <input
            type="text"
            id="name"
            className=" w-full bg-transparent"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="h-44 w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <h2>Description</h2>
          <textarea
            id="desc"
            className="h-24 w-full"
            {...register('description')}
            aria-invalid={errors.description ? 'true' : 'false'}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <OfficerSelector
            control={control}
            register={register}
            errors={errors}
          />
        </div>
        <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
          <ContactSelector
            control={control}
            register={register}
            errors={errors}
          />
        </div>
        <button>submit</button>
      </div>
    </form>
  );
};
export default CreateClubForm;
