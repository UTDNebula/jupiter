'use client';
import { GridIcon, ListIcon } from '@src/components/Icons';
import EventCard from '@src/components/events/EventCard';
import EventSidebar from '@src/components/events/EventSidebar';
import { type SelectEvent } from '@src/server/db/models';
import { useRef, useState } from 'react';

const EventView = ({ events }: { events: Array<SelectEvent> }) => {
  const [view, setView] = useState<'horizontal' | 'vertical'>('horizontal');
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div className="w-full px-6">
      <div className="flex flex-row pb-12 pr-7.5 pt-4">
        <h1 className="text-2xl font-bold text-[#4D5E80]">Events</h1>
        <div className="relative z-0 ml-auto flex flex-row gap-x-16">
          <div
            className={`absolute left-0 top-0 z-10 -mx-7.5 -my-2.5  box-border h-fit w-fit rounded-full bg-white px-7.5 py-2.5 motion-safe:transition-transform ${
              view === 'horizontal' ? '' : 'translate-x-full'
            }`}
          >
            <div
              style={{
                height: ref.current?.offsetHeight ?? 32,
                width: ref.current?.offsetWidth ?? 107,
              }}
            ></div>
          </div>
          <button
            type="button"
            className={`z-20 flex flex-row items-center gap-x-4 `}
            onClick={() => {
              setView('horizontal');
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
            className={`z-20 flex flex-row items-center gap-x-4`}
            onClick={() => {
              setView('vertical');
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
            view === 'horizontal'
              ? 'flex w-full flex-col space-y-7.5 pt-10'
              : 'flex flex-wrap gap-x-10 gap-y-7.5'
          }
        >
          {events.map((event) => {
            return <EventCard key={event.id} view={view} event={event} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default EventView;
