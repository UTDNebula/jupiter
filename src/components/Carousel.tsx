'use client';
import Image from 'next/image';
import { type TouchEvent, useRef, useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../icons/Icons';
import Link from 'next/link';
import { type SelectClub } from '@src/server/db/models';

type Props = { clubs: SelectClub[] };
const Carousel = ({ clubs }: Props) => {
  const [slide, setSlide] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const onClick = (acc: 1 | -1) => {
    setSlide((prevSlide) => {
      const nextSlide = prevSlide + acc;
      if (nextSlide < 0) return clubs.length - 1;
      if (nextSlide >= clubs.length) return 0;
      return nextSlide;
    });
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;

    if (touchEnd.current - touchStart.current > minSwipeDistance) {
      onClick(-1);
    } else if (touchStart.current - touchEnd.current > minSwipeDistance) {
      onClick(1);
    }
  };

  const getSlideStyle = (key: number) => {
    const offset = key - slide;
    return {
      transform: `translateX(${offset * 100}%) scale(${
        offset === 0 ? 1 : 0.9
      })`,
      transition: 'transform 0.8s ease-out',
      boxShadow: offset === 0 ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    };
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        className="relative aspect-video w-full overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex h-full w-full">
          {clubs.map((club, key) => (
            <Link
              className="absolute inset-0 h-full w-full"
              key={key}
              href={`/directory/${club.id}`}
              style={getSlideStyle(key)}
            >
              <div className="relative h-full w-full">
                <Image
                  src={club.image}
                  alt="Picture of the club"
                  width={1920}
                  height={1080}
                  className="h-full w-full rounded-lg object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-5">
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black bg-opacity-50 p-2 sm:p-4 md:p-6">
                    <h1 className="text-lg font-bold text-white sm:text-xl md:text-3xl">
                      {club.name}
                    </h1>
                    <p className="mt-2 line-clamp-2 text-xs text-white sm:text-sm md:text-base">
                      {club.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 top-4 m-5 rounded-full bg-black bg-opacity-50 p-2 font-extrabold text-white sm:p-3">
                  FEATURED CLUB
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-between px-4 sm:px-6 md:px-10">
          <button
            className="pointer-events-auto flex items-center justify-center rounded-full bg-black bg-opacity-70 p-2 transition-all duration-300 hover:scale-110 hover:bg-opacity-80 sm:p-3 md:p-4"
            onClick={() => onClick(-1)}
          >
            <LeftArrowIcon />
          </button>
          <button
            className="pointer-events-auto flex items-center justify-center rounded-full bg-black bg-opacity-70 p-2 transition-all duration-300 hover:scale-110 hover:bg-opacity-80 sm:p-3 md:p-4"
            onClick={() => onClick(1)}
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
