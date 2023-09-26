import { type ReactNode, useState } from 'react';
import { api } from '@src/utils/api';
import { useRouter } from 'next/router';
import type { SelectClub as Club } from '@src/server/db/models';
import SearchBar from './SearchBar';

const BaseHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-20 w-full flex-row content-between items-center justify-start px-5 py-2.5">
      {children}
      <div className="ml-auto flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
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
  const onClickSearchResult = (club: Club) => {
    void router.push(`/directory/${club.id}`);
  };
  return (
    <BaseHeader>
      <SearchBar
        placeholder="Search for Clubs"
        setSearch={setSearch}
        searchResults={res}
        onClick={onClickSearchResult}
      />
    </BaseHeader>
  );
};

export const EventHeader = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <BaseHeader>
        <SearchBar placeholder="Search for Events" setSearch={setSearch} />
      </BaseHeader>
    </>
  );
};

export default Header;
