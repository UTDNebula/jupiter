import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { getCareers, toCareer } from '../models/career';
import User from '../models/user';
import { getYears, toYear } from '../models/year';

export default function Settings() {
  const [res, setRes] = useState<string>();
  const { data: session, status } = useSession();

  const sendForm = async (id: string, user: Partial<User>) => {
    const res = await fetch(`/api/settings?user_id=${id}`, {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const data = await res.json();
    setRes(data.success);
    setTimeout(() => setRes(undefined), 2000);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const user: Partial<User> = {
      first_name: formData.get('fname')?.toString() || undefined,
      last_name: formData.get('lname')?.toString() || undefined,
      career: toCareer(formData.get('career')),
      year: toYear(formData.get('year')),
      major: formData.get('major')?.toString() || undefined,
      minor: formData.get('minor')?.toString() || undefined,
    };
    return await sendForm(formData.get('id') as string, user);
  };

  if (status === 'loading') return <div>Loading...</div>;
  else if (status === 'unauthenticated')
    return (
      <div className="flex flex-col py-2">
        <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mt-8 mb-4">
            Settings
          </h1>
          <div className="text-red-500 font-bold text-center mt-4 absolute">
            You must be signed in to view this page.
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </main>
      </div>
    );

  return (
    <div className="flex flex-col py-2">
      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mt-8 mb-4">
          Settings
        </h1>
        {res && (
          <div className="text-green-500 font-bold text-center mt-4 absolute">
            {res}
          </div>
        )}
        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <input type="hidden" name="id" value={session?.user?.id} />
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              defaultValue={session?.user?.first_name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={session?.user?.last_name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="career"
              className="block text-gray-700 font-bold mb-2"
            >
              Career
            </label>
            <select
              id="career"
              name="career"
              defaultValue={getCareers()[session?.user?.career as number]}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {getCareers().map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-gray-700 font-bold mb-2"
            >
              Year
            </label>
            <select
              id="year"
              name="year"
              defaultValue={getYears()[session?.user?.year as number]}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {getYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="major"
              className="block text-gray-700 font-bold mb-2"
            >
              Major
            </label>
            <input
              type="text"
              id="major"
              name="major"
              defaultValue={session?.user?.major}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="minor"
              className="block text-gray-700 font-bold mb-2"
            >
              Minor
            </label>
            <input
              type="text"
              id="minor"
              name="minor"
              defaultValue={session?.user?.minor}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
