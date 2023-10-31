/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@src/components/Header';
import { api } from '@src/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const editClubSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
});
const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editClubSchema>>({
    resolver: zodResolver(editClubSchema),
  });
  const submitForm = handleSubmit((data) => {
    //form data is in data
    console.log(data);
  });
  const clubQuery = api.club.byId.useQuery(
    {
      id: router.query['clubId'] as string,
    },
    {
      onSuccess: (data) => {
        if (data) {
          reset({ name: data.name, description: data.description });
        }
      },
    },
  );
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <form onSubmit={submitForm}>
          <div className="flex h-full w-full flex-col gap-y-5 p-5">
            <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
              <h1 className="text-lg font-extrabold text-black">
                Edit Organization
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
                disabled={clubQuery.isFetching}
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
                disabled={clubQuery.isFetching}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
              <div className="flex flex-row">
                <h2>Officers</h2>
                <button className="ml-auto" type="button">
                  <Link
                    href={{
                      pathname: '/directory/[clubId]/edit/officers',
                      query: router.query,
                    }}
                  >
                    Edit
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
              <div className="flex flex-row">
                <h2>Contacts</h2>
                <button className="ml-auto" type="button">
                  <Link
                    href={{
                      pathname: '/directory/[clubId]/edit/contacts',
                      query: router.query,
                    }}
                  >
                    Edit
                  </Link>
                </button>
              </div>
            </div>
            <button>Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Page;
