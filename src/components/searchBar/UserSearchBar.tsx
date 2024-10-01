'use client';
import { type SelectUserMetadata } from '@src/server/db/models';
import { api } from '@src/trpc/react';
import { useState, useEffect } from 'react';
import { DebouncedSearchBar } from './DebouncedSearchBar';

type UserSearchBarProps = {
  passUser: (user: { id: string; name: string }) => void;
};
type User = {
  name: string;
} & SelectUserMetadata;
export const UserSearchBar = ({ passUser }: UserSearchBarProps) => {
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<User[]>([]);
  const userQuery = api.userMetadata.searchByName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  useEffect(() => {
    if (userQuery.data) {
      const newData = userQuery.data.map((val) => {
        return { name: val.firstName + ' ' + val.lastName, ...val };
      });
      setRes(newData);
    }
  }, [userQuery.data]);
  return (
    <DebouncedSearchBar
      placeholder="Search for Someone"
      setSearch={setSearch}
      value={search}
      searchResults={res}
      onClick={(user) => {
        passUser({ id: user.id, name: user.name });
        setSearch('');
      }}
    />
  );
};
