import { EventHeader } from '@src/components/BaseHeader';
import EventCalendar from '@src/components/EventCalendar';

const nextMonths = (num: number) => {
  const months = [];
  const date = new Date();
  for (let i = 0; i < num; i++) {
    months.push(date.toLocaleString('default', { month: 'long' }));
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

const Events = () => {
  return (
    <main className="md:pl-72">
      <EventHeader />
      <div className="m-auto flex w-full justify-between p-5">
        <h1 className="text-2xl font-medium text-slate-500">Events</h1>
        <div className="flex items-center justify-center space-x-2">
          {nextMonths(5).map((month, key) => (
            <p
              key={month}
              className={`${
                key === 0 ? ' text-blue-primary' : ' text-slate-500'
              } cursor-pointer rounded-lg px-3 py-1`}
            >
              {month}
            </p>
          ))}
        </div>
        <div className="flex justify-center">
          <h1 className="cursor-pointer text-sm font-medium text-slate-400">
            Subscribe to events
          </h1>
        </div>
      </div>
      <EventCalendar index={1} />
      <EventCalendar index={2} />
    </main>
  );
};

export default Events;
