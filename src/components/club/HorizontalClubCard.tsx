import React from 'react';
import Image from 'next/image';
import { type SelectClub as Club } from '@src/server/db/models';
import { type Session } from 'next-auth';
import JoinButton from './JoinButton';
import Link from 'next/link';

interface HorizontalClubCardProps {
  club: Club;
  session: Session | null;
}

const HorizontalClubCard: React.FC<HorizontalClubCardProps> = ({
  club,
  session,
}) => {
  const desc =
    club.description.length > 50
      ? club.description.slice(0, 150) + '...'
      : club.description;
  const name =
    club.name.length > 20 ? club.name.slice(0, 30) + '...' : club.name;

  return (
    <div className="flex h-48 w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative w-1/3">
        <Image
          src={club.profileImage ? club.profileImage : club.image}
          alt={club.name}
          className="select-none object-cover"
          layout="fill"
        />
      </div>
      <div className="flex w-2/3 flex-col p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-slate-800">{name}</h1>
          <div className="flex space-x-2">
            <JoinButton session={session} clubID={club.id} />
            <Link
              href={`/directory/${club.id}`}
              className="rounded-md bg-blue-100 px-4 py-2 text-center text-blue-600 hover:bg-blue-200"
            >
              Learn More
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
};

export default HorizontalClubCard;
