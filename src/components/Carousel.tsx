'use client';
import Image from 'next/image';
import { type FC, useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from './Icons';

const clubs = ['Nebula', 'ACM', 'Other'];

const Carousel: FC = () => {
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
      <div className="relative h-[110] w-full overflow-hidden rounded-lg">
        {clubs.map((club, key) => (
          <div
            className={`transition-opacity ${
              key === slide ? 'block' : 'hidden'
            }`}
            key={key}
          >
            <div className="h-full w-full">
              <Image
                src="/banner.png"
                alt="Picture of the club"
                width={1920}
                height={1080}
                className="h-full w-full rounded-lg object-cover"
                priority
              />
              <div className="absolute left-0 top-0 z-40 h-full w-full">
                <div className="absolute left-0 top-0 z-20 h-full w-full">
                  <div className="relative flex h-full w-full flex-col justify-between p-2 md:p-[3.75rem]">
                    <div className="w-fit rounded-[1.25rem] bg-black bg-opacity-50 px-5 py-2.5 text-center text-xs font-extrabold text-white md:text-base">
                      Featured Clubs
                    </div>
                    <div className="flex flex-row">
                      <button
                        className="flex items-center justify-center rounded-full bg-black bg-opacity-50 p-4 hover:bg-opacity-70"
                        onClick={() => onClick(-1)}
                      >
                        <LeftArrowIcon />
                      </button>
                      <button
                        className="ml-auto flex items-center justify-center rounded-full bg-black bg-opacity-50 p-4 hover:bg-opacity-70"
                        onClick={() => onClick(1)}
                      >
                        <RightArrowIcon />
                      </button>
                    </div>
                    <div className="flex flex-row justify-center">
                      <h1 className="text-2xl font-bold text-white">{club}</h1>
                      <div className="ml-auto pr-8 text-lg text-white">
                        Short desc
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 z-10 h-2/5 w-full bg-gradient-to-t from-gray-500 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
