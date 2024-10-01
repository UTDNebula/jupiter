'use client';
import { useState } from 'react';
import type { SelectClub as Club } from '@src/server/db/models';
import { api } from '@src/trpc/react';
import { DebouncedSearchBar } from './DebouncedSearchBar';

type EventClubSearchBarProps = {
  addClub: (value: string) => void;
};
export const EventClubSearchBar = ({ addClub }: EventClubSearchBarProps) => {
  const [search, setSearch] = useState('');
  const utils = api.useUtils();
  const { data } = api.club.byName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  const submit = (club: Club) => {
    void utils.club.byId.prefetch({ id: club.id });
    addClub(club.id);
    setSearch('');
  };
  return (
    <DebouncedSearchBar
      placeholder="Select a club"
      setSearch={setSearch}
      value={search}
      searchResults={data || []}
      onClick={submit}
      submitButton
      submitLogic={() => {
        if (data && data[0]) {
          submit(data[0]);
        }
      }}
    />
  );
};
