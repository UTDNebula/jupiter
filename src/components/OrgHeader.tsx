import Image from 'next/image';
import ContactButtons from './ContactButtons';
import type {
  SelectClub,
  SelectContact as Contacts,
} from '@src/server/db/models';
import JoinButton from './JoinButton';
import { getServerAuthSession } from '@src/server/auth';
import LikeButton from './LikeButton';
import Link from 'next/link';
import { api } from '@src/trpc/server';

type Club = SelectClub & {
  contacts?: Contacts[];
  tags: string[];
};
const OrgHeader = async ({ club }: { club: Club }) => {
  const session = await getServerAuthSession();
  const memberType = await api.club.memberType.query({ id: club.id });
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
                <Link
                  href={{
                    pathname: '/',
                    query: { tag: tag },
                  }}
                  key={tag}
                  className="m-2 h-min rounded-full bg-black bg-opacity-50 px-4 py-2 align-middle font-semibold text-slate-100"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className={`mt-auto w-fit rounded-full bg-black bg-opacity-50 p-2 text-center font-bold text-slate-100  ${ club.name.length > 10 ?  'text-2xl' : 'text-4xl' }`}>
              {club.name}
            </h1>
          </div>
          <div className="ml-auto flex h-min flex-row items-center gap-x-12 self-center">
            {memberType === 'Officer' || memberType === 'President' ? (
              <Link
                href={`/manage/${club.id}`}
                className="rounded-full bg-blue-primary p-2.5 text-white transition-colors hover:bg-blue-700"
              >
                Manage
              </Link>
            ) : (
              <>
                <JoinButton
                  session={session}
                  isHeader
                  clubID={club.id}
                  isJoined={memberType !== undefined}
                />
                <button
                  className="rounded-full bg-blue-primary p-2.5 transition-colors hover:bg-blue-700"
                  type="button"
                >
                  <LikeButton />
                </button>
              </>
            )}
            <ContactButtons contacts={club.contacts || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgHeader;
