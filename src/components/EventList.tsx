import Event from './Event';
import React from 'react';
import demoEvents from '../../demoEvents.json';

const EventList = () => {
  return (
    <div className="overflow-y-scroll border-2 border-black md:col-start-2 md:col-end-[-1] md:row-start-1 md:row-end-1 md:h-[75vh]">
      {demoEvents.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </div>
  );
};

export default EventList;
