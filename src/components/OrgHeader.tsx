import React, { type FC } from 'react';
import Image from 'next/image';
import { type Club } from '@src/models/club';
import ContactButtons from './ContactButtons';

const OrgHeader: FC<{ club: Club }> = ({ club }) => {
  return (
    <div className="relative m-5">
      <Image
        src={club.image}
        alt="Picture of the club"
        width={400}
        height={150}
        className="rounded-lg object-cover"
        priority
      />
      <div className="absolute left-0 top-0 flex translate-y-3">
        {['Software', 'Innovation', 'Other'].map((tag) => (
          <p
            key={tag}
            className="m-2 rounded-full bg-black bg-opacity-40 px-4 py-2 font-semibold text-slate-100"
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 -translate-y-5 bg-black opacity-30">
        <h1 className="m-5 text-4xl font-bold text-slate-100">{club.name}</h1>
      </div>
      <div className="absolute bottom-0 right-0  -translate-y-5 flex">
        <button className="m-5 rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-900 transition-colors hover:bg-slate-300">
          Join
        </button>
        <ContactButtons contact={  club.contacts || []}/>
      </div>
    </div>
  );
};

export default OrgHeader;
