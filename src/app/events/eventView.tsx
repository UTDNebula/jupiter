'use client';
import DateBrowser from '@src/components/events/DateBrowser';
import { type eventParamsSchema } from '@src/utils/eventFilter';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  searchParams: eventParamsSchema;
};

const EventView = ({ children, searchParams }: Props) => {
  return (
    <main className="w-full px-6">
      <div className="flex flex-col pt-4 md:flex-row md:items-end md:pb-12 md:pr-7.5">
        <h1
          className="h-min align-middle text-2xl font-bold text-[#4D5E80]"
          id="events-heading"
        >
          Events
        </h1>
        <nav
          className="relative z-0 mt-2.5 flex flex-row justify-center gap-x-16 md:ml-auto md:mt-0"
          aria-label="Event date filter"
        >
          <DateBrowser filterState={searchParams} />
        </nav>
      </div>

      <section aria-labelledby="events-heading" className="w-full">
        <div
          data-view="list"
          className="group flex w-full flex-col items-center space-y-7.5 pt-10 md:items-start"
        >
          {children}
        </div>
      </section>
    </main>
  );
};

export default EventView;
