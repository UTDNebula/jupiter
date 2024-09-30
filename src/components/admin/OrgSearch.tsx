'use client';

import { api } from '@src/trpc/react';
import { useState } from 'react';
import { DebouncedSearchBar } from '../searchBar/DebouncedSearchBar';
import { type SelectClub } from '@src/server/db/models';

type Props = {
  setOrg: ({ id, name }: { id: string; name: string }) => void;
};

export default function OrgSearch({ setOrg }: Props) {
  const [search, setSearch] = useState<string>('');
  const { data } = api.club.byName.useQuery(
    { name: search },
    { enabled: !!search },
  );

  const onClickSearchResult = (club: SelectClub) => {
    setOrg({ id: club.id, name: club.name });
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
