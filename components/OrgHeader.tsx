import React, { FC } from 'react';
import Club from '../models/club';
import Image from 'next/image';

const DirectoryOrgHeader: FC<{ club: Club }> = ({ club }) => {
  return (
    <div className="relative m-5">
      <Image
        src="/banner.png"
        alt="Picture of the club"
        width={1920}
        height={490}
        className="rounded-lg object-cover"
        priority
      />
      <div className="absolute top-0 left-0 flex translate-y-3">
        {['Software', 'Innovation', 'Other'].map((tag) => (
          <p
            key={tag}
            className="text-slate-100 font-semibold rounded-full px-4 py-2 m-2 bg-opacity-40 bg-black"
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 -translate-y-5">
        <h1 className="text-4xl text-slate-100 font-bold m-5">{club.name}</h1>
      </div>
      <div className="absolute right-0 bottom-0  -translate-y-1/2">
        <button className="bg-slate-100 text-slate-900 font-semibold rounded-full px-4 py-2 m-5 hover:bg-slate-300">
          Join
        </button>
      </div>
    </div>
  );
};

export default DirectoryOrgHeader;
