'use client';
import { type Event } from '@src/models/event';
import { type FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import EventCalendarCard from './EventCalendarCard';

const WithPopUp: FC<{ event: Event }> = ({ event }) => {
  const formattedStartTime = `${(event.startTime.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${event.startTime
    .getDate()
    .toString()
    .padStart(
      2,
      '0',
    )}, ${event.startTime.getHours()}:${event.startTime.getMinutes()}`;

  const formattedEndTime = `${(event.startTime.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${event.startTime
    .getDate()
    .toString()
    .padStart(
      2,
      '0',
    )}, ${event.startTime.getHours()}:${event.startTime.getMinutes()}`;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <EventCalendarCard event={event} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="-translate-x-30 fixed left-1/2 top-1/2 -translate-y-1/2 rounded-md border-2 border-black bg-slate-200 p-8">
          <Dialog.Title className="rounded-md py-2 text-xl text-black">
            {event.name}
          </Dialog.Title>
          <Dialog.Description>
            <div className="py-2">
              <div>
                <div>
                  {formattedStartTime} to {formattedEndTime}
                </div>
              </div>
              <div>{event.description}</div>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WithPopUp;
