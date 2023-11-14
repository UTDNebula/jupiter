'use server';
import { GridIcon, ListIcon } from '@src/components/Icons';
import EventCard from '@src/components/events/EventCard';
import EventSidebar from '@src/components/events/EventSidebar';
import { type RouterOutputs } from '@src/trpc/shared';
import Link from 'next/link';
type Props = {
  events: RouterOutputs['event']['findByFilters']['events'];
  params: Record<string, string | string[] | undefined>;
};

const EventView = ({ events, params }: Props) => {
  const view = (params?.view ?? 'list') as 'list' | 'grid';

  return (
    <div className="w-full px-6">
      <div className="flex flex-row pb-12 pr-7.5 pt-4">
        <h1 className="text-2xl font-bold text-[#4D5E80]">Events</h1>
        <div className="relative z-0 ml-auto flex flex-row gap-x-16">
          <Link
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view === 'list'
                ? ' -mr-7.5 rounded-full bg-white px-7.5 py-2.5'
                : ''
            }`}
            href={{
              pathname: '/events',
              query: {
                ...params,
                view: 'list',
              },
            }}
          >
            <div className="h-7.5 w-7.5">
              <ListIcon />
            </div>
            <p className="text-sm font-bold text-blue-primary">List view</p>
          </Link>
          <Link
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view == 'grid'
                ? '-ml-7.5 rounded-full bg-white px-7.5 py-2.5'
                : 'mr-7.5'
            }`}
            href={{
              pathname: '/events',
              query: {
                ...params,
                view: 'grid',
              },
            }}
          >
            <div className="h-7.5 w-7.5">
              <GridIcon />
            </div>
            <p className="text-sm font-bold text-blue-primary">Grid view</p>
          </Link>
        </div>
      </div>
      <div className="container flex w-full flex-row space-x-7.5">
        <EventSidebar />
        <div
          data-view={view}
          className={
            view === 'list'
              ? 'group flex w-full flex-col space-y-7.5 pt-10'
              : 'group flex flex-wrap gap-x-10 gap-y-7.5 pt-10'
          }
        >
          {events.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default EventView;
