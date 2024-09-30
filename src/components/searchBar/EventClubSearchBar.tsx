'use client';
import { useState, useEffect } from 'react';
import type { SelectClub as Club } from '@src/server/db/models';
import { api } from '@src/trpc/react';
import { DebouncedSearchBar } from './DebouncedSearchBar';

type EventClubSearchBarProps = {
  addClub: (value: string) => void;
};
export const EventClubSearchBar = ({ addClub }: EventClubSearchBarProps) => {
  const [search, setSearch] = useState('');
  const [res, setRes] = useState<Club[]>([]);
  const utils = api.useUtils();
  const clubQuery = api.club.byName.useQuery(
    { name: search },
    {
      enabled: !!search,
    },
  );
  useEffect(() => {
    if (clubQuery.data) {
      setRes(clubQuery.data);
    }
  }, [clubQuery.data]);
  return (
    <DebouncedSearchBar
      placeholder="Select a club"
      setSearch={setSearch}
      value={search}
      searchResults={res}
      onClick={(club) => {
        void utils.club.byId.prefetch({ id: club.id });
        addClub(club.id);
        setSearch('');
      }}
    />
  );
};
