'use server';

import EventCard from '@src/components/events/EventCard';
import { api } from '@src/trpc/server';
import Link from 'next/link';

const CommunityEvents = async () => {
  const events = await api.userMetadata.getEvents();
  if (events.length === 0) {
    return (
      <div className="font-bold text-slate-500">
        <div>You haven&apos;t added any community events yet 😭</div>
        <div>
          You can check out new events{' '}
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
      className="group flex w-full flex-col space-y-7.5 pt-10"
      data-view={'list'}
    >
      {events.map((event) => (
        <div className="w-full" key={event.id}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};
export default CommunityEvents;
