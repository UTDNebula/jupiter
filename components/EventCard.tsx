import React from 'react';
import Image from 'next/image';

type Props = { name: string };

export const EventCard = ({ name }: Props) => {
  return (
    <div className="carousel-item relative">
      <div className="card card-normal">
        <Image
          src="https://about.utdnebula.com/assets/images/nebula-logo-wordmark-dark-0b2813eedf7447691178ca82b5f53dce.png"
          height={200}
          width={200}
          className="bg-gray-300 image-full"
          alt="Event"
        />
        <div>{name}</div>
      </div>
    </div>
  );
};
export default EventCard;
