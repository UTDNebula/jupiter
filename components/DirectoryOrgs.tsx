import React, { FC } from 'react';
import { Org } from '../types/orgs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Club, { getImage } from '../models/club';

interface Props {
  club: Club;
}

const OrgDirectoryCards: FC<Props> = ({ club }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/directory/${club.id}`);
  };

  return (
    <div
      className="w-full h-auto flex flex-col justify-between p-5 m-5 rounded-2xl cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <h4 className="text-xl font-bold text-center md:text-left">
        {club.name}
      </h4>
      <div className="w-auto h-40 relative rounded-sm p-2">
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
