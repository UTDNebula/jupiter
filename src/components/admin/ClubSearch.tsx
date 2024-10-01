'use client';

import { api } from '@src/trpc/react';
import { useState } from 'react';
import { DebouncedSearchBar } from '../searchBar/DebouncedSearchBar';
import { type SelectClub } from '@src/server/db/models';

type Props = {
  setClub: ({ id, name }: { id: string; name: string }) => void;
};

export default function ClubSearch({ setClub }: Props) {
  const [search, setSearch] = useState<string>('');
  const { data } = api.club.byName.useQuery(
    { name: search },
    { enabled: !!search },
  );

  const onClickSearchResult = (club: SelectClub) => {
    setClub({ id: club.id, name: club.name });
    setSearch('');
  };
  return (
    <DebouncedSearchBar
      placeholder="Search for Clubs"
      setSearch={setSearch}
      searchResults={data || []}
      onClick={onClickSearchResult}
    />
  );
}
