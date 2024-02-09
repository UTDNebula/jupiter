import { EventHeader } from '@src/components/BaseHeader';
import { api } from '@src/trpc/server';
import { type z } from 'zod';
import { type findByFilterSchema } from '@src/server/api/routers/event';
import EventView from './eventView';
import { type Metadata } from 'next';
import { eventParamsSchema } from '@src/utils/eventFilter';
import EventCard from '@src/components/events/EventCard';

function getStartTime(
  filterState: z.infer<typeof eventParamsSchema>,
): z.infer<typeof findByFilterSchema>['startTime'] {
  switch (filterState.filter) {
    case 'Upcoming Events':
      return { type: 'now' };
    case 'Last weeks events':
      return { type: 'distance', options: { days: -7 } };
    case 'Last month events':
      return { type: 'distance', options: { days: -30 } };
    default:
      return { type: 'now' };
  }
}
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
const Events = async ({
  searchParams,
}: {
  searchParams: (typeof eventParamsSchema)['_input'];
}) => {
  const parsed = eventParamsSchema.parse(searchParams);
  const { events } = await api.event.findByFilters.query({
    startTime: getStartTime(parsed),
    club: parsed.clubs,
    order: parsed.order,
  });
  return (
    <main className="pb-10 md:pl-72">
      <EventHeader />
      <EventView>
        {events.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </EventView>
    </main>
  );
};

export default Events;
