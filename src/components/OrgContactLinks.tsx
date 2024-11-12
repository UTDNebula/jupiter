import Image from 'next/image';
import ContactButtons from './ContactButtons';
import type {
  SelectClub,
  SelectContact as Contacts,
} from '@src/server/db/models';
import JoinButton from './JoinButton';
import { getServerAuthSession } from '@src/server/auth';
import Link from 'next/link';
import { api } from '@src/trpc/server';

type Club = SelectClub & {
  contacts?: Contacts[];
  tags: string[];
};
const OrgContactLinks = async ({ club }: { club: Club }) => {
  const session = await getServerAuthSession();
  const memberType = await api.club.memberType({ id: club.id });
  return (
    <div className="relative">
      <div className="h-full w-full">
        <Image
          src={'/images/lightBlueBG.png'}
          alt="Picture of the club"
          style={{
            width: '100%',
            height: 'auto',
          }}
          height={150}
          width={450}
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="flex h-full w-full p-8 flex-row">
          <div className="flex h-full flex-col justify-center">
            <h1
              className={`w-fit rounded-full p-2 text-center font-bold text-customBlue ${
                club.name.length > 10 ? 'text-2xl' : 'text-4xl'
              }`}
            >
              {"Contact Information"}
            </h1>
          </div>
          <div className="ml-auto flex h-min flex-row items-center gap-x-12 self-center">
            <ContactButtons contacts={club.contacts || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgContactLinks;
