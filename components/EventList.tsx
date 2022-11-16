import Event from './Event';
import React from 'react';
import demoEvents from '../demoEvents.json';

const EventList = () => {
  return (
    <div className="w-full carousel carousel-center space-y-4 max-w-full carousel-vertical rounded-box h-[80vh]">
      {demoEvents.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </div>
  );
};

export default EventList;
