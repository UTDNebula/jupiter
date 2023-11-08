import { type FC } from 'react';
import Image from 'next/image';
import { GroupIcon, HeartIcon } from './Icons';
import type { SelectClub as Club } from '@src/server/db/models';
import Link from 'next/link';

interface Props {
  club: Club;
}

const OrgDirectoryCards: FC<Props> = ({ club }) => {
  return (
    <div className="flex h-full max-w-xs flex-col rounded-lg bg-white shadow-lg md:w-full">
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-64">
        <Image src={club.image} fill alt={club.name} className="select-none" />
        <div className="absolute left-2 right-2 top-2 flex h-fit flex-row items-center">
          <div className="flex flex-row items-center rounded-full bg-black bg-opacity-50 py-1.5 pl-4 pr-5">
            <div className="h-7 w-7 text-white">
              <GroupIcon />
            </div>
            <div className="ml-1 h-fit w-fit text-xs font-bold text-white">
              {30} Members
            </div>
          </div>
          <button className="ml-auto rounded-full bg-black bg-opacity-50 p-1.5 font-bold text-slate-800 transition-colors">
            <div className="h-7 w-7">
              <HeartIcon fill="fill-white" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col p-6">
        <h1 className="text-xl font-medium text-slate-800">{club.name}</h1>
        <h2 className="mb-1 text-sm font-light text-slate-500">
          Founded in {2020}
        </h2>
        <p className="mt-3 line-clamp-3 text-xs text-slate-500">Description</p>
        <p className="mb-4 text-sm text-slate-600">{club.description}</p>
        <div className="flex flex-row">
          <button className="mr-2 rounded-2xl bg-blue-primary px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
            Join
          </button>
          <Link
            href={`/directory/${club.id}`}
            className="rounded-2xl bg-blue-600 bg-opacity-10 px-4 py-2 text-xs font-extrabold text-blue-primary  transition-colors hover:bg-blue-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
