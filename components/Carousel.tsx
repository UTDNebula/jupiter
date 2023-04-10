import Image from 'next/image';
import React, { FC } from 'react';

const clubs = ['Nebula', 'ACM', 'Other'];

const clubMap = {
  Nebula: 'https://tecdn.b-cdn.net/img',
  ACM: 'https://tecdn.b-cdn.net/img',
  Other: 'https://tecdn.b-cdn.net/img',
} as const;

const Carousel = () => {
  return (
    <>
      <CarouselItems arr={clubs} />
    </>
  );
};

const CarouselItems: FC<{ arr: string[] }> = ({ arr }) => {
  const [slide, setSlide] = React.useState(0);
  const onClick = (acc: number) => {
    if (slide + acc < 0) return setSlide(arr.length - 1);
    if (slide + acc > arr.length - 1) return setSlide(0);
    setSlide(slide + acc);
  };

  const num = arr.length;
  return (
    <div className="w-full h-auto relative m-auto">
      {arr.map((club, key) => (
        <div
          className={`transition-opacity ${key === slide ? 'block' : 'hidden'}`}
          key={key}
        >
          <div className="text-slate-300 text-sm absolute top-0 px-2 py-3">
            {key + 1} / {num}
          </div>
          <Image
            src="/banner.png"
            alt="Picture of the author"
            width={1920}
            height={1080}
            className="rounded-lg w-full h-full object-cover"
          />
          <div className="text-slate-300 text-lg px-2 py-4 absolute bottom-2 w-full text-center">
            Caption Text for {club}
          </div>
        </div>
      ))}

      <a
        className="cursor-pointer absolute top-1/2 w-auto -mt-6 p-4  text-white font-bold text-xl transition select-none opacity-80"
        onClick={() => onClick(-1)}
      >
        &#10094;
      </a>
      <a
        className="cursor-pointer absolute top-1/2 w-auto -mt-6 p-4  text-white font-bold text-xl transition select-none right-0 hover:opacity-80"
        onClick={() => onClick(1)}
      >
        &#10095;
      </a>
    </div>
  );
};

export default Carousel;
