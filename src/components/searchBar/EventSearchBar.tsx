'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@src/trpc/react';
import type { SelectEvent as Event } from '@src/server/db/models';
import { DebouncedSearchBar } from './DebouncedSearchBar';

export const EventSearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [res, setRes] = useState<Event[]>([]);

  const eventQuery = api.event.byName.useQuery(
    {
      name: search,
      sortByDate: true,
    },
    { enabled: !!search },
  );
  useEffect(() => {
    if (eventQuery.data) setRes(eventQuery.data);
  }, [eventQuery.data]);

  return (
    <DebouncedSearchBar
      placeholder="Search for Events"
      setSearch={setSearch}
      searchResults={res}
      onClick={(event) => {
        router.push(`/event/${event.id}`);
      }}
    />
  );
};
