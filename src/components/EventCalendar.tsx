import React from 'react';
import EventCalendarCard from './EventCalendarCard';

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
// This function will return a week from sunday to saturday
const thisWeek = (index = 0): Date[] => {
  const date = new Date();
  date.setDate(date.getDate() + index * 7);
  const day = date.getDay();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + (i - day));
    week.push(newDate);
  }
  return week;
};

const EventCalendar: React.FC<{ index: number }> = ({ index }) => {
  const today = new Date();
  return (
    <div className="flex w-full justify-between p-2">
      {thisWeek(index).map((day, key) => (
        <div className="flex select-none flex-col items-center" key={key}>
          <div
            className={`m-1 flex h-16 w-36 flex-col items-center justify-center rounded-md p-5 ${
              today.getDay() === day.getDay() && index === 0
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
            {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(
              (_, key) => (
                <EventCalendarCard key={key} />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCalendar;
