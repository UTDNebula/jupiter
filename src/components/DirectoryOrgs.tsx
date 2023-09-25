import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HeartIcon } from './Icons';
import type { SelectClub as Club } from '@src/server/db/models';

interface Props {
  club: Club;
}

const OrgDirectoryCards: React.FC<Props> = ({ club }) => {
  const [liked, setLiked] = React.useState(false);
  const router = useRouter();

  const onClick = () => router.push(`/directory/${club.id}`);

  const like = () => setLiked((prev) => !prev);

  return (
    <div className="flex h-full max-w-xs flex-col rounded-lg bg-white shadow-lg md:w-full">
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-64">
        <Image src={club.image} fill alt={club.name} className="select-none" />
        <div className="absolute left-2 top-2 h-7 justify-center rounded-2xl bg-black bg-opacity-50 py-1.5 pl-4 pr-5 align-middle text-xs text-white">

          {30} Members
        </div>
        <button
          className="absolute right-2 top-2 rounded-lg      font-bold text-slate-800 transition-colors"
          onClick={() => like()}
        >
          <HeartIcon fill={liked ? 'fill-red-500' : 'fill-white'} />
        </button>
      </div>
      <div className="flex flex-col p-6">
        <h1 className="text-xl font-medium text-slate-800">{club.name}</h1>
        <h2 className="mb-1 text-sm font-light text-slate-500">
          Founded in {2020}
        </h2>
        <p className="mt-3 line-clamp-3 text-xs text-slate-500">Description</p>
        <p className="mb-4 text-sm text-slate-600">{club.description}</p>
        <div className="flex flex-row">
          <button className="mr-2 rounded-2xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
            Join
          </button>
          <button
            className="rounded-2xl bg-blue-600 bg-opacity-10 px-4 py-2 text-xs font-extrabold text-slate-800 transition-colors hover:bg-blue-200"
            onClick={() => void onClick()}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
