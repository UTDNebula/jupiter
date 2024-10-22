import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from '@src/components/events/EventCard';
import { api } from '@src/trpc/react';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await api.event.searchByName.useQuery({ name: query });
      setEvents(data || []);
    };

    if (query) {
      fetchEvents();
    }
  }, [query]);

  return (
    <main className="pb-10 md:pl-72">
      <h1 className="text-2xl font-bold">Events</h1>
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