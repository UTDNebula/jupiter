import { type FC } from 'react';
import Image from 'next/image';
import type { SelectClub as Club } from '@src/server/db/models';
import JoinButton from './JoinButton';
import LikeButton from './LikeButton';
import Link from 'next/link';
import { type Session } from 'next-auth';

type Props = { club: Club; session: Session | null; priority: boolean };

const OrgDirectoryCards: FC<Props> = ({ club, session, priority }) => {
  const desc =
    club.description.length > 50
      ? club.description.slice(0, 150) + '...'
      : club.description;
  const name =
    club.name.length > 20 ? club.name.slice(0, 30) + '...' : club.name;
  return (
    <div className="flex h-full min-h-[600px] min-w-[300px] max-w-xs flex-col justify-between rounded-lg bg-white shadow-lg">
      <div className="relative h-48 overflow-hidden rounded-t-lg sm:h-56 md:h-64 lg:h-72">
        <Image
          src={club.profileImage ? club.profileImage : club.image}
          layout="fill"
          alt={club.name}
          priority={priority}
          className="select-none object-cover"
        />
        <div className="absolute left-2 right-2 top-2 flex h-fit flex-row items-center space-x-2">
          <button className="ml-auto rounded-full bg-black bg-opacity-50 p-1.5 font-bold text-white transition-colors">
            <LikeButton />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-6">
        <h1 className="text-xl font-medium text-slate-800">{name}</h1>
        <h2 className="text-sm font-light text-slate-500">Founded in {2020}</h2>
        <p className="line-clamp-3 text-xs text-slate-500">Description</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
      <div className="m-5 flex flex-row space-x-2">
        <JoinButton session={session} clubID={club.id} />
        <Link
          href={`/directory/${club.id}`}
          className="rounded-2xl bg-blue-600 bg-opacity-10 px-4 py-2 text-xs font-extrabold text-blue-primary  transition-colors hover:bg-blue-200"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export const OrgDirectoryCardSkeleton: FC = () => {
  return (
    <div className="flex h-full min-h-[600px] min-w-[300px] animate-pulse flex-col rounded-lg bg-white shadow-lg">
      <div className="h-48 bg-slate-300 sm:h-56 md:h-64 lg:h-72"></div>
      <div className="space-y-4 p-6">
        <div className="h-6 rounded bg-slate-300"></div>
        <div className="h-4 rounded bg-slate-300"></div>
        <div className="h-4 w-3/4 rounded bg-slate-300"></div>
        <div className="h-4 w-1/2 rounded bg-slate-300"></div>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
