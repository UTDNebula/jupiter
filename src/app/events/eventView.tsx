'use client';
import { GridIcon, ListIcon } from '@src/components/Icons';
import EventCard from '@src/components/events/EventCard';
import EventSidebar from '@src/components/events/EventSidebar';
import { type SelectClub, type SelectEvent } from '@src/server/db/models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const EventView = ({
  events,
}: {
  events: Array<SelectEvent & { club: SelectClub }>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<'list' | 'grid'>(
    (searchParams.get('view') as 'list' | 'grid') ?? 'list',
  );
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);
    router.push(pathname + '?' + params.toString());
  }, [view, router, pathname]);
  return (
    <div className="w-full px-6">
      <div className="flex flex-row pb-12 pr-7.5 pt-4">
        <h1 className="text-2xl font-bold text-[#4D5E80]">Events</h1>
        <div className="relative z-0 ml-auto flex flex-row gap-x-16">
          <button
            type="button"
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view === 'list'
                ? ' -mr-7.5 rounded-full bg-white px-7.5 py-2.5'
                : ''
            }`}
            onClick={() => {
              setView('list');
            }}
            ref={ref}
          >
            <div className="h-7.5 w-7.5">
              <ListIcon />
            </div>
            <p className="text-sm font-bold text-blue-primary">List view</p>
          </button>
          <button
            type="button"
            className={`z-20 flex flex-row items-center gap-x-4 ${
              view == 'grid'
                ? '-ml-7.5 rounded-full bg-white px-7.5 py-2.5'
                : 'mr-7.5'
            }`}
            onClick={() => {
              setView('grid');
            }}
          >
            <div className="h-7.5 w-7.5">
              <GridIcon />
            </div>
            <p className="text-sm font-bold text-blue-primary">Grid view</p>
          </button>
        </div>
      </div>
      <div className="container flex w-full flex-row space-x-7.5">
        <EventSidebar />
        <div
          className={
            view === 'list'
              ? 'flex w-full flex-col space-y-7.5 pt-10'
              : 'flex flex-wrap gap-x-10 gap-y-7.5 pt-10'
          }
        >
          {events.map((event) => {
            return (
              <EventCard
                key={event.id}
                view={view === 'list' ? 'horizontal' : 'vertical'}
                event={event}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EventView;
