import React, { FC, useState } from 'react';
import demoEvents from '../demoEvents.json';
import Image from 'next/image';

interface Props {
  event: typeof demoEvents[0];
}

const Event: FC<Props> = ({ event }) => {
  const [text, setText] = useState('Save Event to Profile');

  const onClick = () => {
    setText('Saved!');
    // Mock API call to save event to profile
    setTimeout(() => {
      setText('Save Event to Profile');
    }, 2000);
  };

  return (
    <div className="md:grid md:grid-cols-3 justify-between p-5 m-5 rounded-2xl border-2 border-blue-600">
      <div className="col-span-1">
        {/* Mock gray rectangle  */}
        <div className="w-40 h-40 relative justify-center rounded-sm p-2">
          <Image
            src={'/utd-monogram-solid-rgb.jpg'}
            width={400}
            height={400}
            alt={event.title}
          />
        </div>
      </div>
      <div className="col-start-2 col-end-[-2]">
        <h4 className="text-xl font-bold text-center md:text-left">
          {event.title}
        </h4>
        <p className="text-lg font-light text-center md:text-left">
          {event.title}
        </p>
        <p className="text-lg font-light text-center md:text-left">
          {event.date}
        </p>
        <p className="text-lg font-light text-center md:text-left">
          {event.time}
        </p>
        <p className="text-lg font-light text-center md:text-left">
          {event.location}
        </p>
      </div>
      <div className="col-start-3 col-end-[-1] flex flex-col justify-center items-center">
        <button
          onClick={onClick}
          className="bg-blue-600 text-white rounded-md p-2 m-2"
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default Event;
