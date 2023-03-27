import { type FC, useState } from 'react';
import type demoEvents from '../../demoEvents.json';
import Image from 'next/image';

interface Props {
  event: (typeof demoEvents)[0];
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
    <div className="m-5 justify-between rounded-2xl border-2 border-blue-600 p-5 md:grid md:grid-cols-3">
      <div className="col-span-1">
        {/* Mock gray rectangle  */}
        <div className="relative h-40 w-40 justify-center rounded-sm p-2">
          <Image
            src={'/utd-monogram-solid-rgb.jpg'}
            width={400}
            height={400}
            alt={event.title}
          />
        </div>
      </div>
      <div className="col-start-2 col-end-[-2]">
        <h4 className="text-center text-xl font-bold md:text-left">
          {event.title}
        </h4>
        <p className="text-center text-lg font-light md:text-left">
          {event.title}
        </p>
        <p className="text-center text-lg font-light md:text-left">
          {event.date}
        </p>
        <p className="text-center text-lg font-light md:text-left">
          {event.time}
        </p>
        <p className="text-center text-lg font-light md:text-left">
          {event.location}
        </p>
      </div>
      <div className="col-start-3 col-end-[-1] flex flex-col items-center justify-center">
        <button
          onClick={onClick}
          className="m-2 rounded-md bg-blue-600 p-2 text-white"
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default Event;
