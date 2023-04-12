import React from 'react';

const EventCard = () => {
  return (
    <div className="w-36 text-center rounded-lg items-center p-2 bg-orange-400 m-2">
      <div className="flex justify-between p-2 -m-2">
        <p className="text-xs font-semibold">Event Name</p>
        <p className="text-xs">11:00</p>
      </div>
      <p className="text-xs mt-2 line-clamp-1">
        Lorem ipsum dolor sit amet consectetur
      </p>
    </div>
  );
};

export default EventCard;
