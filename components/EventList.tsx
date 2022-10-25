import Event from './Event';
import React from 'react';
import demoEvents from '../demoEvents.json';
import Image from 'next/image';

const EventList = () => {
  return (
    <div className="md:col-start-2 md:col-end-[-1] md:row-start-1 md:row-end-1 overflow-y-scroll md:h-[75vh] border-black border-2">
      {demoEvents.map((event, i) => (
        <Event key={i} event={event} />
      ))}
    </div>
  );
};

export default EventList;
