'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@src/trpc/react';
import type { SelectEvent as Event } from '@src/server/db/models';
import { DebouncedSearchBar } from './DebouncedSearchBar';

export const EventSearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const { data } = api.event.byName.useQuery(
    {
      name: search,
      sortByDate: true,
    },
    { enabled: !!search },
  );
  const onClickSearchResult = (event: Event) => {
    router.push(`/event/${event.id}`);
  };
  return (
    <DebouncedSearchBar
      placeholder="Search for Events"
      setSearch={setSearch}
      searchResults={data || []}
      onClick={onClickSearchResult}
      submitButton
      submitLogic={() => {
        if (data && data[0]) {
          onClickSearchResult(data[0]);
        }
      }}
    />
  );
};
