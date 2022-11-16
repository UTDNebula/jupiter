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
    <div className="carousel-item p-5">
      <div className="card md:card-side bg-base-200 w-full">
        {/* Mock gray rectangle  */}
        <figure>
          <Image
            src={'/utd-monogram-solid-rgb.jpg'}
            alt={event.title}
            height={200}
            width={200}
          />
        </figure>
        <div className="card-body md:flex-row justify-between">
          <div className="flex flex-col">
            <h4 className="card-title text-center">{event.title}</h4>
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
          <div className="card-actions justify-center content-center">
            <button onClick={onClick} className="btn btn-primary">
              {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
