import React from "react";
import Image from "next/image";

type Props = { name: string };

export const EventCard = ({ name }: Props) => {
  return (
    <div className="flex h-full w-full flex-col justify-center text-center">
      <Image
        src="https://about.utdnebula.com/assets/images/nebula-logo-wordmark-dark-0b2813eedf7447691178ca82b5f53dce.png"
        height={200}
        width={200}
        className="bg-gray-300"
        alt="Nebula Logo"
      />
      <div>{name}</div>
    </div>
  );
};
export default EventCard;
