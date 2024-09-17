import { type SelectClub } from '@src/server/db/models';
import Image from 'next/image';
import Link from 'next/link';

const ClubCard = ({ club }: { club: SelectClub }) => {
  return (
    <Link
      className="relative flex h-[300px] w-[356px] flex-col overflow-clip rounded-lg bg-white shadow-sm"
      href={`/manage/${club.id}`}
    >
      <h2 className="absolute top-0 w-full bg-white p-4 text-lg font-bold text-blue-primary shadow-sm">
        {club.name}
      </h2>
      <div>
        <Image
          alt={club.name}
          src={club.profileImage ?? '/nebula-logo.png'}
          width={356}
          height={300}
          className=""
        />
      </div>
    </Link>
  );
};
export default ClubCard;
