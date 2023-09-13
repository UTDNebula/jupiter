import Image from 'next/image';
import React, { type FC } from 'react';

const clubs = ['Nebula', 'ACM', 'Other'];

const Carousel: FC = () => {
  const [slide, setSlide] = React.useState(0);

  const onClick = (acc: number) => {
    setSlide((prevSlide) => {
      const nextSlide = prevSlide + acc;
      if (nextSlide < 0) return clubs.length - 1;
      if (nextSlide > clubs.length - 1) return 0;
      return nextSlide;
    });
  };

  return (
    <div className="mx-auto w-10/12">
      <div className="relative h-auto w-full">
        {clubs.map((club, key) => (
          <div
            className={`transition-opacity ${
              key === slide ? 'block' : 'hidden'
            }`}
            key={key}
          >
            <Image
              src="/banner.png"
              alt="Picture of the club"
              width={1920}
              height={1080}
              className="h-full w-full rounded-lg object-cover"
              priority
            />
            <div className="absolute bottom-2 w-full px-2 py-4 text-center text-lg text-slate-300">
              Caption Text for {club}
            </div>
          </div>
        ))}

        <a
          className="absolute top-1/2 -mt-6 w-auto cursor-pointer select-none p-4 text-xl font-bold text-white opacity-80 transition"
          onClick={() => onClick(-1)}
        >
          &#10094;
        </a>
        <a
          className="absolute right-0 top-1/2 -mt-6 w-auto cursor-pointer select-none p-4 text-xl font-bold text-white transition hover:opacity-80"
          onClick={() => onClick(1)}
        >
          &#10095;
        </a>
      </div>
    </div>
  );
};

export default Carousel;
