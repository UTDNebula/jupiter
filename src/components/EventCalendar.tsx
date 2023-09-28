import React, { useState } from 'react';
import EventCalendarCard from './EventCalendarCard';
import { api } from '@src/utils/api';
import type { Event } from '@src/types/event';
import * as Dialog from '@radix-ui/react-dialog';

const EventCalendar: React.FC<{ index: number }> = ({ index }) => {
  const [events, setEvents] = useState<Event[] | undefined>();

  const dates = React.useMemo(() => {
    const today = new Date();
    const daysSinceLastSunday = today.getDay();
    const startDate = new Date(today);

    startDate.setDate(today.getDate() - daysSinceLastSunday + (index - 1) * 7);

    const dates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }

    return dates;
  }, [index]);

  const today = new Date();

  api.event.byDateRange.useQuery(
    {
      startTime: dates[0] || today,
      endTime: dates[6] || today,
    },
    {
      onSuccess: (data) => {
        setEvents(data);
      },
    },
  );

  return (
    <div className="flex w-full justify-between p-2">
      {dates.map((day, key) => (
        <div className="flex select-none flex-col items-center" key={key}>
          <div
            className={`m-1 flex h-16 w-36 flex-col items-center justify-center rounded-md p-5 ${
              today.getDay() === day.getDay() && index === 1
                ? 'bg-blue-500'
                : 'bg-slate-100'
            }`}
          >
            <p className="text-sm font-semibold">{weekDays[day.getDay()]}</p>
            <p className="mt-2 text-sm">
              {day.getMonth() + 1} - {day.getDate()}
            </p>
          </div>
          <div className="h-60 overflow-y-scroll py-2">
            {(events || []).map((event, key) => {
              const eventDate = new Date(event.startTime);
              const givenDate = new Date(day);

              if (
                eventDate.getDate() === givenDate.getDate() &&
                eventDate.getMonth() === givenDate.getMonth() &&
                eventDate.getFullYear() === givenDate.getFullYear()
              ) {
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
                  <Dialog.Root key={key}>
                    <Dialog.Trigger asChild>
                      <button>
                        <EventCalendarCard event={event} />
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-30 -translate-y-1/2 bg-slate-200 p-8 rounded-md border-2 border-black">
                        <Dialog.Title className="rounded-md text-xl text-black py-2">
                          {event.name}
                        </Dialog.Title>
                        <Dialog.Description>
                          <div className='py-2'>
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
              } else {
                return <div key={key}></div>;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export default EventCalendar;
