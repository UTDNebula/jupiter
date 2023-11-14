import { type Session } from 'next-auth';

function SettingsForm({ session }: { session: Session }) {
  const user = session.user;
  if (!user) throw new Error('User not found');
  return (
    <div className="m-auto w-full items-center justify-center overflow-hidden rounded-b-lg p-6">
      <div className="h-40 rounded-t-3xl bg-gradient-to-r from-[#5A49F7] from-[4.36%] via-[#9403D8] via-[49.74%] to-[#FD9365]"></div>
      <div className="relative -mt-20">
        <div className="mx-auto rounded-b-lg bg-white p-6 shadow-xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          </div>

          <div className="mb-4 flex">
            <div className="flex flex-col">
              <label className="ml-2 mr-2 text-xs text-slate-500">
                First Name
              </label>
              <input
                type="text"
                defaultValue={session.user.firstName}
                className="mr-2 rounded-full border p-2"
                name="firstName"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 mr-2 text-xs text-slate-500">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                defaultValue={session.user.lastName}
                className="mr-2 rounded-full border p-2"
                name="lastName"
              />
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="flex flex-col">
              <label className="ml-2 mr-2 text-xs text-slate-500">Major</label>
              <input
                type="text"
                defaultValue={session.user.major}
                className="mr-2 rounded-full border p-2"
                name="major"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 mr-2 text-xs text-slate-500">Minor</label>
              <input
                type="text"
                defaultValue={session.user.minor || ''}
                className="mr-2 rounded-full border p-2"
                name="minor"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="ml-2 mr-2 text-xs text-slate-500">Minor</label>
              <select
                defaultValue={session.user.year}
                className="mr-2 rounded-full border p-2"
                name="minor"
              >
                {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
            <select className="col-span-1 rounded border p-2">
              <option>Officer</option>
            </select>
            <div></div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {/* Clubs would be repeated based on data, but here it's hardcoded */}
            <div className="flex items-center rounded border p-2">
              <span className="mr-2">Nebula Labs</span>
              <span className="cursor-pointer">✖️</span>
            </div>
            {/* Repeat other chips here */}
          </div>

          <div className="flex justify-between">
            <button className="rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-700">
              Delete account
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;
