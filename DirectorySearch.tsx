import { ChangeEvent, useEffect, useState } from 'react';
import DbProvider from './backend_tools/db_provider';
import Club from './models/club';

const fetchResults = async (search: string): Promise<Club[]> => {
  const db = new DbProvider();
  const data = await db.getClubsByName(search);
  return data;
  // Mock data
  //   return [
  //     {
  //       contacts: {
  //         email: '',
  //       },
  //       description: "We're a club",
  //       name: 'Club 1',
  //     },
  //   ];
};

const DirectorySearch = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Club[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Debounce
    const timeout = setTimeout(() => {
      fetchResults(search).then((res) => {
        setResults(res);
      });
    }, 500);

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
      <input
        className="relative mt-5 md:mt-10 rounded-md md:text-2xl w-full h-12 md:h-16 px-4 md:px-8 bg-white"
        placeholder="Search Organizations"
        autoFocus
        tabIndex={1}
        onChange={handleSearch}
      />
      <div className="relative mt-5 md:mt-10">
        {results.map((club, key) => {
          return <p key={key}>{club.name}</p>;
        })}
      </div>
    </div>
  );
};

export default DirectorySearch;
