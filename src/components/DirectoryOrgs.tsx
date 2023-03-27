import type { FC } from 'react';
import { useRouter } from 'next/router';
import type Club from '../models/club';
import { getImage } from '../models/club';
import Image from 'next/image';

interface Props {
  club: Club;
}

const OrgDirectoryCards: FC<Props> = ({ club }) => {
  const router = useRouter();

  const onClick = () => {
    void router.push(`/directory/${club.id}`);
  };

  return (
    <div
      className="m-5 flex h-auto w-full cursor-pointer flex-col justify-between rounded-2xl p-5 hover:bg-gray-100"
      onClick={onClick}
    >
      <h4 className="text-center text-xl font-bold md:text-left">
        {club.name}
      </h4>
      <div className="relative h-40 w-auto rounded-sm p-2">
        <Image
          src={getImage(club)}
          alt={club.name}
          sizes="100vw"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
