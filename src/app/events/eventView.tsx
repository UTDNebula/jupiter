'use client';
import DateBrowser from '@src/components/events/DateBrowser';
import EventSidebar from '@src/components/events/EventSidebar';
import { type ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

const EventView = ({ children }: Props) => {
  return (
    <div className="w-full px-6">
      <div className="flex flex-row pb-12 pr-7.5 pt-4">
        <h1 className="text-2xl font-bold text-[#4D5E80]">Events</h1>
        <div className="relative z-0 ml-auto flex flex-row gap-x-16">
          <DateBrowser />
        </div>
      </div>
      <div className="container flex w-full flex-col overflow-x-clip sm:flex-row sm:space-x-7.5">
        <EventSidebar />
        <div
          data-view={'list'}
          className={'group flex w-full flex-col space-y-7.5 pt-10'}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default EventView;
