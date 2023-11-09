import { EventHeader } from '@src/components/BaseHeader';
import { type filterState } from '@src/components/events/EventSidebar';
import { api } from '@src/trpc/server';
import { type z } from 'zod';
import { type findByFilterSchema } from '@src/server/api/routers/event';
import EventView from './eventView';
import { type Metadata } from 'next';

function getStartTime(
  filterState: filterState,
): z.infer<typeof findByFilterSchema>['startTime'] {
  switch (filterState.filter) {
    case 'Upcoming Events':
      return { type: 'now' };
    case 'Last weeks events':
      return { type: 'distance', options: { days: -7 } };
    case 'Last month events':
      return { type: 'distance', options: { days: -30 } };
    case 'pick':
      return filterState.date
        ? { type: 'range', options: filterState.date }
        : { type: 'now' };
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
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  /*const { events } = await api.event.findByFilters.query({
    startTime: getStartTime(filterState),
    club: filterState.club.map((val) => val.id),
    order: filterState.order,
  });*/
  console.log(searchParams);
  return (
    <main className="pb-10 md:pl-72">
      <EventHeader />
      <EventView events={[]} />
    </main>
  );
};

export default Events;
