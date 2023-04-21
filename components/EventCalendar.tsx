import React from 'react';
import EventCard from './EventCard';

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
const thisWeek = (index: number = 0): Date[] => {
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
    <div className="w-full flex justify-between p-2">
      {thisWeek(index).map((day, key) => (
        <div className="flex flex-col items-center select-none" key={key}>
          <div
            className={`w-36 h-16 rounded-md flex flex-col justify-center items-center p-5 m-1 ${
              today.getDay() === day.getDay() && index === 0
                ? 'bg-blue-500'
                : 'bg-slate-100'
            }`}
          >
            <p className="text-sm font-semibold">{weekDays[day.getDay()]}</p>
            <p className="text-sm mt-2">
              {day.getMonth() + 1} - {day.getDate()}
            </p>
          </div>
          <div className="py-2">
            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
              (_, key) => (
                <EventCard key={key} />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCalendar;
