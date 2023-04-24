import Image from 'next/image';
import React, { FC } from 'react';

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
    <div className="w-10/12 mx-auto">
      <div className="w-full h-auto relative">
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
              className="rounded-lg w-full h-full object-cover"
              priority
            />
            <div className="text-slate-300 text-lg px-2 py-4 absolute bottom-2 w-full text-center">
              Caption Text for {club}
            </div>
          </div>
        ))}

        <a
          className="cursor-pointer absolute top-1/2 w-auto -mt-6 p-4 text-white font-bold text-xl transition select-none opacity-80"
          onClick={() => onClick(-1)}
        >
          &#10094;
        </a>
        <a
          className="cursor-pointer absolute top-1/2 w-auto -mt-6 p-4 text-white font-bold text-xl transition select-none right-0 hover:opacity-80"
          onClick={() => onClick(1)}
        >
          &#10095;
        </a>
      </div>
    </div>
  );
};

export default Carousel;
