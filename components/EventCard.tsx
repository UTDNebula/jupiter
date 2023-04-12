import React from 'react';

const EventCard = () => {
  return (
    <div className="w-36 text-center rounded-md items-center p-5 bg-orange-500 m-2">
      <div className="flex justify-between">
        <p className="text-xs font-semibold">Event Name</p>
        <p className="text-xs">11:00</p>
      </div>
      <p className="text-xs mt-2">Lorem ipsum dolor sit amet consectetur</p>
    </div>
  );
};

export default EventCard;
