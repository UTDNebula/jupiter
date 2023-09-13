import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HeartIcon } from './Icons';
import { type Club } from '@src/models/club';

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
        <div className="absolute left-2 top-2 rounded-lg bg-black bg-opacity-50 px-2 py-1 text-white">
          {30} Members
        </div>
        <button
          className="absolute right-2 top-2 rounded-lg px-2 py-1 font-bold text-slate-800  transition-colors"
          onClick={() => like()}
        >
          <HeartIcon fill={liked ? 'fill-red-500' : undefined} />
        </button>
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-lg font-medium text-slate-800">{club.name}</h1>
        <h1 className="mb-1 text-sm font-light text-slate-500">
          Founded in {2020}
        </h1>
        <p className="mt-3 line-clamp-3 text-xs text-slate-500">Description</p>
        <p className="mb-4 text-sm text-slate-600">{club.description}</p>
      </div>
      <div className="flex justify-end p-4">
        <button className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
          Join
        </button>
        <button
          className="rounded-2xl bg-blue-100 px-4 py-2 font-bold text-slate-800 transition-colors hover:bg-blue-200"
          onClick={() => void onClick()}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
