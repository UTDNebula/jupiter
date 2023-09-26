import Image from 'next/image';
import ContactButtons from './ContactButtons';
import type {
  SelectClub,
  SelectContact as Contacts,
} from '@src/server/db/models';

type Club = SelectClub & {
  contacts?: Contacts[];
};

const OrgHeader = ({ club }: { club: Club }) => {
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
              {['Software', 'Innovation', 'Other'].map((tag) => (
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
          <div className="ml-auto flex h-min flex-row content-center gap-x-12 self-center">
            <button className="rounded-3xl bg-blue-500 px-8 py-4 hover:bg-blue-600">
              Join
            </button>
            <ContactButtons contacts={club.contacts || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgHeader;
