/* eslint-disable @typescript-eslint/no-misused-promises */
import Header from '@src/components/Header';
import Sidebar from '@src/components/Sidebar';
import { TagSearchBar } from '@src/components/SearchBar';
import ContactSelector from '@src/components/ContactSelector';
import OfficerSelector from '@src/components/OfficerSelector';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectContact } from '@src/server/db/models';

export const createClubSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
  officers: z
    .object({
      name: z.string().min(1),
      position: z.string().min(1),
    })
    .array()
    .min(1),
  contacts: selectContact.omit({ clubId: true }).array(),
});
const Page = () => {
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
    <main>
      <Sidebar />
      <div className="md:pl-72">
        <Header />
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
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
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
              <OfficerSelector control={control} register={register} />
            </div>
            <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
              <ContactSelector control={control} register={register} />
            </div>
            <button>submit</button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Page;
