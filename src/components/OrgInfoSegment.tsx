import Image from 'next/image';
import React, { type FC } from 'react';
import type { SelectClub as Club } from '@src/server/db/models';

const OrgInfoSegment: FC<{ club: Club }> = ({ club }) => {
  return (
    <div className="w-full rounded-lg bg-slate-100 p-10">
      <div className="flex flex-col items-start justify-between md:flex-row">
        <div className="pr-12">
          <Image
            src={club.image}
            alt="Picture of the club"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h1 className="mt-5 text-2xl font-medium">Description</h1>
          <div className="mt-5 flex w-36 justify-between">
            <p className="text-sm text-slate-400">Name</p>
            <p className="text-right text-sm text-slate-600">{club.name}</p>
          </div>
          <div className="mt-2 flex w-36 justify-between">
            <p className="text-sm text-slate-400">Founded</p>
            <p className="text-right text-sm text-slate-600">May 2020</p>
          </div>
          <div className="mt-2 flex w-36 justify-between">
            <p className="text-sm text-slate-400">President</p>
            <p className="text-right text-sm text-slate-600">John Doe</p>
          </div>
          <div className="mt-2 flex w-36 justify-between">
            <p className="text-sm text-slate-400">Active</p>
            <p className="text-right text-sm text-slate-600">Present</p>
          </div>
        </div>
        <div className="w-full">
          {club.description.split('\n').map((str, i) => (
            <p className="text-slate-700" key={i}>
              {str}
            </p>
          ))}
        </div>
        <div className="w-full text-center">
          <h1 className="mt-5 text-2xl font-medium">Leadership</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-5 flex flex-row items-center justify-center align-middle">
              <Image
                src={club.image}
                alt="Picture of the author"
                width={60}
                height={60}
                className="m-3 rounded-full"
              />
              <div className="mx-5 flex flex-col items-center justify-center align-middle">
                <p className="text-sm text-slate-600">John Doe</p>
                <p className="mt-2 text-sm text-slate-400">President</p>
              </div>
            </div>
            <div className="mt-5 flex flex-row items-center justify-center align-middle">
              <Image
                src={club.image}
                alt="Picture of the author"
                width={60}
                height={60}
                className="m-3 rounded-full"
              />
              <div className="mx-5 flex flex-col items-center justify-center align-middle">
                <p className="text-sm text-slate-600">John Doe</p>
                <p className="mt-2 text-sm text-slate-400">Treasurer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgInfoSegment;
