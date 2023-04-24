import React, { type FC } from 'react';
import Image from 'next/image';
import { type Club } from '@src/models/club';

const OrgHeader: FC<{ club: Club }> = ({ club }) => {
  return (
    <div className="relative m-5">
      <Image
        src={club.image}
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
      <div className="absolute bottom-0 left-0 -translate-y-5 bg-black opacity-30">
        <h1 className="text-4xl text-slate-100 font-bold m-5">{club.name}</h1>
      </div>
      <div className="absolute right-0 bottom-0  -translate-y-5">
        <button className="bg-slate-100 text-slate-900 font-semibold rounded-full px-4 py-2 m-5 hover:bg-slate-300 transition-colors">
          Join
        </button>
      </div>
    </div>
  );
};

export default OrgHeader;
