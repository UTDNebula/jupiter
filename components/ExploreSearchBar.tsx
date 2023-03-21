import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Club from '../models/club';

const fetchResults = async (name: string) => {
  const res = await fetch(`/api/club?name=${name}`);
  const data = await res.json();
  if (!data?.clubs || name === '') return [];
  return data.clubs;
};

const ExploreSearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Club[]>([]);
  const router = useRouter();
  const onClick = (name: string) => {
    router.push(`/directory/${name}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Debounce
    const timeout = setTimeout(
      () => fetchResults(search).then((res) => setResults(res)),
      250,
    );

    return () => clearTimeout(timeout);
  }, [search]);

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
          <div className="absolute px-5 z-1 bg-slate-100 w-full rounded-sm h-7 align-middle cursor-pointer hover:bg-slate-300">
            {results.map((club, key) => (
              <div
                key={key}
                className="w-max"
                onClick={() => onClick(club.name)}
              >
                {club.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreSearchBar;
