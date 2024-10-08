import EventCard from '@src/components/events/EventCard';
import { SelectEvent } from '@src/server/db/models';
import Link from 'next/link';

type Event = SelectEvent & {
  liked: boolean;
  club: {
    id: string;
    name: string;
    description: string;
    image: string;
    tags: string[];
    approved: "approved" | "rejected" | "pending";
    profileImage: string | null;
    soc: boolean;
  }
}

type Props = {
  events: Event[];
}

const CommunityEvents = ({ events }: Props) => {
  if (events.length == 0) {
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
      className="group flex w-full flex-col items-center space-y-7.5 pt-4 sm:items-start"
      data-view={'list'}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default CommunityEvents;
