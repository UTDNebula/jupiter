import { EventHeader } from '@src/components/header/BaseHeader';
import { api } from '@src/trpc/server';
import EventView from './eventView';
import { type Metadata } from 'next';
import { eventParamsSchema } from '@src/utils/eventFilter';
import EventCard from '@src/components/events/EventCard';

export const metadata: Metadata = {
  title: 'Events - Jupiter',
  description: 'Get connected on campus.',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/events',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/events',
    description: 'Get connected on campus.',
  },
};
const Events = async ({ searchParams: paramsPromise }: { searchParams: Promise<(typeof eventParamsSchema)['_input']> }) => {
  const searchParams = await paramsPromise
  const parsed = eventParamsSchema.parse(searchParams);
  const { events } = await api.event.findByDate({ date: parsed.date });
  return (
    <main className="pb-10 md:pl-72">
      <EventHeader />
      <EventView searchParams={parsed}>
        { events.length === 0 && <div>No events found for this date</div>}
        { events.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </EventView>
    </main>
  );
};

export default Events;
