import { type FC } from 'react';
import { api } from '@src/trpc/server';
import EventCardWithPopUp from './EventCardWithPopUp';

function getDateRange(today: Date, index: number): Date[] {
  const daysSinceLastSunday = today.getDay();
  const startDate = new Date(
    today.setDate(today.getDate() - daysSinceLastSunday),
  );
  startDate.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + (index - 1) * 7 + i);
    return currentDate;
  });
}

const EventCalendar: FC<{ index: number }> = async ({ index }) => {
  const today = new Date();
  const dates = getDateRange(today, index);
  console.log(today);

  const events = await api.event.byDateRange.query({
    startTime: dates[0]!,
    endTime: dates[6]!,
  });

  return (
    <div className="flex w-full justify-between p-2">
      {dates.map((day, key) => (
        <div className="flex select-none flex-col items-center" key={key}>
          <div
            className={`m-1 flex h-16 w-36 flex-col items-center justify-center rounded-md p-5 ${
              today.getDay() === day.getDay() && index === 1
                ? 'bg-blue-primary text-white'
                : 'bg-slate-100'
            }`}
          >
            <p className="text-sm font-semibold">{weekDays[day.getDay()]}</p>
            <p className="mt-2 text-sm">
              {day.getMonth() + 1} - {day.getDate()}
            </p>
          </div>
          <div className="h-60 overflow-y-scroll py-2">
            {events.map((event) => {
              const eventDate = new Date(event.startTime);
              const givenDate = new Date(day);

              if (
                eventDate.getDate() === givenDate.getDate() &&
                eventDate.getMonth() === givenDate.getMonth() &&
                eventDate.getFullYear() === givenDate.getFullYear()
              )
                return <EventCardWithPopUp event={event} key={event.id} />;
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
