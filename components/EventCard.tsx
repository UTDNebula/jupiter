import React from 'react';
import Image from 'next/image';

type Props = { name: string };

export const EventCard = ({ name }: Props) => {
  return (
    <div className="pt-64 flex flex-col justify-center w-full h-full text-center">
      <img
        src="https://about.utdnebula.com/assets/images/nebula-logo-wordmark-dark-0b2813eedf7447691178ca82b5f53dce.png"
        className="bg-gray-300 h-44"
      />
      <div>{name}</div>
    </div>
  );
};
export default EventCard;
