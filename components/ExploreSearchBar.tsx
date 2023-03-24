import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Club from '../models/club';

const fetchResults = async (name: string) => {
  if (name.length === 0) return [];
  const res = await fetch(`/api/club?name=${name}`);
  const data = await res.json();
  return data?.clubs ?? [];
};

const ExploreSearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Club[]>([]);
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchResults(search).then((res) => setResults(res));
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const onClick = (id: string) => {
    router.push(`/directory/${id}`);
  };

  return (
    <div className="justify-center flex flex-col min-h-[45vh] mx-auto md:w-[55vw] w-[75vw]">
      <p className="relative text-6xl md:text-8xl font-semibold text-white">
        Jupiter
      </p>
      <p className="relative text-base md:text-2xl font-semibold text-white">
        Get Connected on Campus.
      </p>
      <div className="relative">
        <input
          className="relative mt-5 md:mt-10 rounded-md md:text-2xl w-full h-12 md:h-16 px-4 md:px-8 bg-white"
          placeholder="Search Organizations"
          autoFocus
          tabIndex={1}
          onChange={handleSearch}
        />
        {results.length > 0 && (
          <div className="absolute z-10 top-full left-0 right-0 rounded-sm mt-1 overflow-hidden shadow-lg">
            {results.map((club) => (
              <button
                key={club.name}
                className="block w-full text-left pb-2 px-4 bg-gray-50 hover:bg-gray-200 text-lg"
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
