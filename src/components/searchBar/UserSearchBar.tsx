'use client';
import { api } from '@src/trpc/react';
import { useState } from 'react';
import { DebouncedSearchBar } from './DebouncedSearchBar';

type UserSearchBarProps = {
  passUser: (user: { id: string; name: string }) => void;
};
export const UserSearchBar = ({ passUser }: UserSearchBarProps) => {
  const [search, setSearch] = useState('');
  const userQuery = api.userMetadata.searchByName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  const formattedData = userQuery.isSuccess
    ? userQuery.data.map((val) => {
        return { name: val.firstName + ' ' + val.lastName, ...val };
      })
    : [];
  return (
    <DebouncedSearchBar
      placeholder="Search for Someone"
      setSearch={setSearch}
      value={search}
      searchResults={formattedData}
      onClick={(user) => {
        passUser({ id: user.id, name: user.name });
        setSearch('');
      }}
      submitLogic={() => {
        if (formattedData && formattedData[0]) {
          const user = formattedData[0];
          passUser({ id: user.id, name: user.name });
          setSearch('');
        }
      }}
    />
  );
};
