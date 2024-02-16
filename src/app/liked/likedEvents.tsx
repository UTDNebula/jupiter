'use server';

import EventCard from '@src/components/events/EventCard';
import { api } from '@src/trpc/server';
import Link from 'next/link';

const LikedEvents = async () => {
  const events = await api.userMetadata.getEvents.query();
  if (events.length == 0) {
    return (
      <div className="font-bold text-slate-500">
        <div>you haven&apos;t liked any events yet 😢</div>
        <div>
          you can check out new events{' '}
          <Link
            href={'/events'}
            className="text-lg text-blue-primary transition-colors hover:text-blue-700"
          >
            here
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div
      className="group flex w-full flex-col items-center space-y-7.5 pt-10 sm:items-start"
      data-view={'list'}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default LikedEvents;
