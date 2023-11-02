import { type SelectEvent } from '@src/server/db/models';
import { DateTime } from 'luxon';
import { type ReactNode } from 'react';

type EventTimeAlertProps = {
  event: SelectEvent;
};
type BaseProps = { children: ReactNode; className?: string };
const Base = ({ children, className }: BaseProps) => {
  return (
    <div
      className={` w-fit rounded-[.3125rem] bg-opacity-70 px-2.5 py-1.25 text-center text-xs font-extrabold text-white ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
};
const EventTimeAlert = ({ event }: EventTimeAlertProps) => {
  const now = DateTime.now();
  const start = DateTime.fromJSDate(event.startTime);
  const hourDiff = start.diff(now, 'hours');
  if (event.startTime < new Date()) {
    if (event.endTime < new Date()) {
      return <Base className="bg-red-600">over :(</Base>;
    } else {
      return <Base className="bg-green-600">NOW</Base>;
    }
  } else {
    if (start.diffNow('days').days < 1) {
      if (hourDiff.hours < 1) {
        return (
          <Base className="bg-red-600">
            {start.diffNow('minutes').toFormat('m')} minutes
          </Base>
        );
      } else if (hourDiff.hours < 4) {
        return (
          <Base className="bg-yellow-600">{hourDiff.toFormat('h')} hours</Base>
        );
      } else {
        return <Base className="bg-black">{hourDiff.toFormat('h')} hours</Base>;
      }
    } else {
      return (
        <Base className="bg-black">
          {start.diffNow('days').toFormat('d')} days
        </Base>
      );
    }
  }
};
export default EventTimeAlert;
