import { type FC } from 'react';
import Image from 'next/image';
import { GroupIcon, HeartIcon } from './Icons';
import type { SelectClub as Club } from '@src/server/db/models';
import { getServerAuthSession } from '@src/server/auth';
import Joinbutton from './JoinButton';
import Link from 'next/link';
import { db } from '@src/server/db';
import { eq, and } from 'drizzle-orm';
import { userMetadataToClubs } from '@src/server/db/schema';
import { api } from '@src/trpc/server';

interface Props {
  club: Club;
}

const OrgDirectoryCards: FC<Props> = async ({ club }) => {
  const session = await getServerAuthSession();
  let isJoined;
  if(session){
    isJoined = !!await db.query.userMetadataToClubs.findFirst({
      where: and(eq(userMetadataToClubs.userId, session.user.id), eq(userMetadataToClubs.clubId, club.id))
    });
  }
  
  const desc =
    club.description.length > 50
      ? club.description.slice(0, 150) + '...'
      : club.description;
  const name =
    club.name.length > 20 ? club.name.slice(0, 30) + '...' : club.name;
  return (
    <div className="flex h-full min-h-[600px] max-w-xs flex-col rounded-lg bg-white shadow-lg ">
      <div className="relative h-48 overflow-hidden sm:h-56 md:h-64 lg:h-72">
        <Image
          src={club.image}
          layout="fill"
          alt={club.name}
          className="select-none object-cover"
        />
        <div className="absolute left-2 right-2 top-2 flex h-fit flex-row items-center space-x-2">
          <div className="flex flex-row items-center rounded-full bg-black bg-opacity-50 px-4 py-1.5">
            <div className="h-7 w-7 text-white">
              <GroupIcon />
            </div>
            <div className="ml-1 h-fit w-fit text-xs font-bold text-white">
              {30} Members
            </div>
          </div>
          <button className="ml-auto rounded-full bg-black bg-opacity-50 p-1.5 font-bold text-white transition-colors">
            <div className="h-7 w-7">
              <HeartIcon fill="fill-white" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-6">
        <h1 className="text-xl font-medium text-slate-800">{name}</h1>
        <h2 className="text-sm font-light text-slate-500">Founded in {2020}</h2>
        <p className="line-clamp-3 text-xs text-slate-500">Description</p>
        <p className="text-sm text-slate-600">{desc}</p>
        <div className="flex flex-row space-x-2">
        <Joinbutton session={session} clubID={club.id} isJoined={isJoined}/>
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