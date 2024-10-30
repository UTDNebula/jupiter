'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@src/trpc/react';
import type { Event } from '@src/server/db/models';
import { type Session } from 'next-auth';
import EventCard from '@src/components/events/EventCard';

interface EventSearchComponentProps {
  userSearch: string;
  session: Session | null;
}

export const EventSearchComponent = ({
  userSearch,
  session,
}: EventSearchComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(userSearch);

  const { data } = api.event.byName.useQuery(
    { name: search },
    { enabled: !!search },
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  if (!data) {
    return <p />;
  }
  if (data.length === 0) {
    return (
      <div className="text-center text-4xl font-bold text-slate-500">
        No Search Results Found
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search events"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      <div className="grid w-full auto-rows-fr grid-cols-[repeat(auto-fill,320px)] justify-center gap-16 pb-4">
        {data.map((event: Event) => (
          <EventCard key={event.id} event={event} session={session} priority />
        ))}
      </div>
    </div>
  );
};