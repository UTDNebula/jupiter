import React from 'react';

const EventCalendarCard = () => {
  return (
    <div className="m-2 w-36 select-none items-center rounded-lg bg-events p-2 text-center">
      <div className="-m-2 flex justify-between p-2">
        <p className="text-xs font-semibold">Event Name</p>
        <p className="text-xs">11:00</p>
      </div>
      <p className="mt-2 line-clamp-1 text-xs">
        Lorem ipsum dolor sit amet consectetur
      </p>
    </div>
  );
};

export default EventCalendarCard;
