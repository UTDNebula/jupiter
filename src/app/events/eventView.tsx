'use server';
import { GridIcon, ListIcon } from '@src/icons/Icons';
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
      <div className="md:pr-7.5 flex flex-col pt-4 sm:flex-row sm:pb-12">
        <h1 className="text-left text-2xl font-bold text-[#4D5E80]">Events</h1>
        <div className="relative z-0 hidden flex-row gap-x-16 md:ml-auto md:flex">
          <Link
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view === 'list'
                ? ' -mr-7.5 px-7.5 rounded-full bg-white py-2.5'
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
            <p className="text-blue-primary text-sm font-bold">List view</p>
          </Link>
          <Link
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view == 'grid'
                ? '-ml-7.5 px-7.5 rounded-full bg-white py-2.5'
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
            <p className="text-blue-primary text-sm font-bold">Grid view</p>
          </Link>
        </div>
      </div>
      <div className="sm:space-x-7.5 container flex w-full flex-col overflow-x-clip sm:flex-row">
        <EventSidebar />
        <div
          data-view={view}
          className={
            view === 'list'
              ? 'space-y-7.5 group flex flex-col pt-10 sm:justify-start'
              : 'gap-y-7.5 group flex flex-wrap justify-center gap-x-10 pt-10 sm:justify-start'
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
