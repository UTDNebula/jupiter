import Image from 'next/image';
import React, { FC } from 'react';
import Club, { getImageLink } from '../models/club';

const OrgInfo: FC<{ club: Club }> = ({ club }) => {
  return (
    <div className="w-11/12 mx-auto bg-slate-100 rounded-lg p-10">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/3">
          <Image
            src={getImageLink(club)}
            alt="Picture of the author"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-medium mt-5">Description</h1>
          <div className="w-36 mt-5 flex justify-between">
            <p className="text-sm text-slate-400">Name</p>
            <p className="text-sm text-slate-600 text-right">{club.name}</p>
          </div>
          <div className="w-36 mt-2 flex justify-between">
            <p className="text-sm text-slate-400">Founded</p>
            <p className="text-sm text-slate-600 text-right">May 2020</p>
          </div>
          <div className="w-36 mt-2 flex justify-between">
            <p className="text-sm text-slate-400">President</p>
            <p className="text-sm text-slate-600 text-right">John Doe</p>
          </div>
          <div className="w-36 mt-2 flex justify-between">
            <p className="text-sm text-slate-400">Active</p>
            <p className="text-sm text-slate-600 text-right">Present</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et
          odit, est numquam praesentium omnis recusandae soluta? Suscipit alias
          modi ratione eligendi fugit voluptatum quidem nulla quaerat! Eos,
          officia distinctio?
        </div>
        <div className="w-full md:w-1/3 text-center">
          <h1 className="text-2xl font-medium mt-5">Leadership</h1>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center align-middle mt-5">
              <Image
                src={getImageLink(club)}
                alt="Picture of the author"
                width={60}
                height={60}
                className="rounded-full m-3"
              />
              <div className="flex flex-col justify-center items-center align-middle mx-5">
                <p className="text-sm text-slate-600">John Doe</p>
                <p className="text-sm text-slate-400 mt-2">President</p>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center align-middle mt-5">
              <Image
                src={getImageLink(club)}
                alt="Picture of the author"
                width={60}
                height={60}
                className="rounded-full m-3"
              />
              <div className="flex flex-col justify-center items-center align-middle mx-5">
                <p className="text-sm text-slate-600">John Doe</p>
                <p className="text-sm text-slate-400 mt-2">Treasurer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgInfo;
