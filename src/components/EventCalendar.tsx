import React, { useState } from 'react';
import EventCalendarCard from './EventCalendarCard';
import { api } from '@src/utils/api';
import type { Event } from '@src/types/event';

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

  console.log(dates[0]);

  api.event.byDateRange.useQuery(
    {
      startTime: dates[0] || today,
      endTime: dates[6] || today,
    },
    {
      onSuccess: (data) => {
        console.log(data);
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
              today.getDay() === day.getDay() && index === 0
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
            {(events || []).map(
              (event, key) => (
                <EventCalendarCard event={event} key={key} />
              ),
            )}
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
