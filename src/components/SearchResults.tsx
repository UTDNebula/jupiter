import { api } from '@src/trpc/server';
import EventCard from '@src/components/events/EventCard';
import { useSearchParams } from 'next/navigation';

const SearchResults = async () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const { events } = await api.event.searchByName({ name: query });

  return (
    <main className="pb-10 md:pl-72">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      <div className="flex flex-col space-y-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;