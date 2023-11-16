import Image from 'next/image';
import ContactButtons from './ContactButtons';
import type {
  SelectClub,
  SelectContact as Contacts,
} from '@src/server/db/models';
import Joinbutton from './JoinButton';
import { getServerAuthSession } from '@src/server/auth';
import { eq, and } from 'drizzle-orm';
import { db } from '@src/server/db';
import { userMetadataToClubs } from '@src/server/db/schema';
import LikeButton from './LikeButton';

type Club = SelectClub & {
  contacts?: Contacts[];
  tags: string[];
};
const OrgHeader = async ({ club }: { club: Club }) => {
  const session = await getServerAuthSession();
  let isJoined;
  if(session){
    isJoined = !!await db.query.userMetadataToClubs.findFirst({
      where: and(eq(userMetadataToClubs.userId, session.user.id), eq(userMetadataToClubs.clubId, club.id))
    });
  }
  return (
    <div className="relative">
      <div className="h-full w-full">
        <Image
          src={club.image}
          alt="Picture of the club"
          width={400}
          height={150}
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="flex h-full w-full flex-row   p-8">
          <div className="flex h-full flex-col">
            <div className="flex flex-row">
              {club.tags.map((tag) => (
                <p
                  key={tag}
                  className="m-2 rounded-full bg-black bg-opacity-50 px-4 py-2 font-semibold text-slate-100"
                >
                  {tag}
                </p>
              ))}
            </div>
            <h1 className="mt-auto w-fit rounded-full bg-black bg-opacity-50 p-2 text-center text-4xl font-bold text-slate-100">
              {club.name}
            </h1>
          </div>
          <div className="ml-auto flex h-min flex-row items-center gap-x-12 self-center">
            <Joinbutton session={session} isHeader clubID={club.id} isJoined={isJoined}/>
            <button
              className="rounded-full bg-blue-primary p-2.5 transition-colors hover:bg-blue-700"
              type="button" 
            >
              <LikeButton />
            </button>
            <ContactButtons contacts={club.contacts || []} />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default OrgHeader;
