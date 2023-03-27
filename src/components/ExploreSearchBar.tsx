import type Club from '@src/models/club';
import { api } from '@src/utils/api';
import { useRouter } from 'next/router';
import { type ChangeEvent, useState } from 'react';

const ExploreSearchBar = () => {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [res, setRes] = useState<Club[]>([]);
  api.club.byName.useQuery(
    { name: search },
    {
      onSuccess: (data) => {
        // Debounce the search results
        setTimeout(() => {
          setRes(data);
        }, 300);

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
    <div className="mx-auto flex min-h-[45vh] w-[75vw] flex-col justify-center md:w-[55vw]">
      <p className="relative text-6xl font-semibold text-white md:text-8xl">
        Jupiter
      </p>
      <p className="relative text-base font-semibold text-white md:text-2xl">
        Get Connected on Campus.
      </p>
      <div className="relative">
        <input
          className="relative mt-5 h-12 w-full rounded-md bg-white px-4 md:mt-10 md:h-16 md:px-8 md:text-2xl"
          placeholder="Search Organizations"
          autoFocus
          tabIndex={1}
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 300)}
        />
        {focused && res.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 overflow-hidden rounded-sm shadow-lg">
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
    </div>
  );
};

export default ExploreSearchBar;
