import { type ChangeEvent, useState } from 'react';
import { SearchIcon } from './Icons';
import { api } from '@src/utils/api';
import { useRouter } from 'next/navigation';
import { type Club } from '@src/models/club';
const Header = () => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<Club[]>([]);
  api.club.byName.useQuery(
    { name: search },
    {
      onSuccess: (data) => {
        setTimeout(() => setRes(data), 300);
        return data;
      },
    },
  );
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClick = (id: string) => {
    void router.push(`/directory/${id}`);
  };
  return (
    <div className="flex h-16 w-full content-between items-center justify-between px-5 py-3">
      <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search for clubs"
          className="h-10 w-full rounded-full border pl-10 pr-3 focus:outline-none"
          tabIndex={0}
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 300)}
        />
        {focused && res.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-sm shadow-lg">
            {res.map((club) => (
              <button
                key={club.name}
                className="block w-full bg-gray-50 px-4 pb-2 text-left text-lg hover:bg-gray-200"
                onClick={() => onClick(club.id)}
              >
                <p className="text-sm font-semibold">{club.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};
const nextMonths = (num: number) => {
  const months = [];
  const date = new Date();
  for (let i = 0; i < num; i++) {
    months.push(date.toLocaleString('default', { month: 'long' }));
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

export const EventHeader = () => {
  return (
    <>
      <div className="flex h-16 w-full content-between items-center justify-between px-5 py-3">
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search for events"
            className="h-10 w-full rounded-full border pl-10 pr-3 focus:outline-none"
            tabIndex={0}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
      </div>
      <div className="m-auto flex w-full justify-between p-5">
        <h1 className="text-2xl font-medium text-slate-500">Events</h1>
        <div className="flex items-center justify-center space-x-2">
          {nextMonths(5).map((month, key) => (
            <p
              key={month}
              className={`${
                key === 0 ? ' text-blue-400' : ' text-slate-500'
              } cursor-pointer rounded-lg px-3 py-1`}
            >
              {month}
            </p>
          ))}
        </div>
        <div className="flex justify-center">
          <h1 className="cursor-pointer text-sm font-medium text-slate-400">
            Subscribe to events
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;
