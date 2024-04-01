'use client';
import Image from 'next/image';
import { useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../icons/Icons';
import Link from 'next/link';

type featuredClub = {
  id: string;
  name: string;
  shortDesc: string;
};
const clubs: Array<featuredClub> = [
  {
    name: 'Nebula Labs',
    id: '654d361fbfe4308bcdfc4145',
    shortDesc: 'cool club',
  },
  { 
    name: 'ACM', 
    id: '654d35edbfe4308bcdfc4004', 
    shortDesc: 'cool club' 
  },
  {
    name: 'Comet Robotics',
    id: '654d35f8bfe4308bcdfc405b',
    shortDesc: 'cool club',
  },
];

const Carousel = () => {
  const [slide, setSlide] = useState(0);

  const onClick = (acc: number) => {
    setSlide((prevSlide) => {
      const nextSlide = prevSlide + acc;
      if (nextSlide < 0) return clubs.length - 1;
      if (nextSlide > clubs.length - 1) return 0;
      return nextSlide;
    });
  };

  return (
    <div className="mx-auto w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {clubs.map((club, key) => (
          <Link
            className={`absolute inset-0 z-0 h-full w-full transition-opacity ${
              key === slide ? 'block' : 'hidden'
            }`}
            key={key}
            href={`/directory/${club.id}`}
          >
            <div className="relative h-full w-full">
              <Image
                src="/banner.png"
                alt="Picture of the club"
                width={window.innerWidth}
                height={window.innerHeight}
                className="h-full w-full rounded-lg object-cover"
                priority
              />
              <div className="absolute inset-0 h-full w-full">
                <div className="absolute inset-0 z-10 h-full w-full">
                  <div className="relative flex h-full w-full flex-col justify-between p-2 md:p-[3.75rem]">
                    <div className="mt-auto flex flex-row justify-center">
                      <h1 className="text-2xl font-bold text-white">
                        {club.name}
                      </h1>
                      <div className="ml-auto pr-8 text-lg text-white">
                        {club.shortDesc}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-2/5 w-full bg-gradient-to-t from-gray-500 to-transparent"></div>
              </div>
            </div>
          </Link>
        ))}
        <div className="pointer-events-none absolute inset-0 flex h-full w-full flex-col justify-between p-2 md:p-[3.75rem]">
          <div className="pointer-events-auto w-fit rounded-[1.25rem] bg-black bg-opacity-50 px-5 py-2.5 text-center text-xs font-extrabold text-white md:text-base">
            Featured Clubs
          </div>
          <div className="flex flex-row">
            <button
              className="pointer-events-auto flex items-center justify-center rounded-full bg-black bg-opacity-50 p-4 hover:bg-opacity-70"
              onClick={() => onClick(-1)}
            >
              <LeftArrowIcon />
            </button>
            <button
              className="pointer-events-auto ml-auto flex items-center justify-center rounded-full bg-black bg-opacity-50 p-4 hover:bg-opacity-70"
              onClick={() => onClick(1)}
            >
              <RightArrowIcon />
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
