import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Club, { getImageLink } from '../models/club';

interface Props {
  club: Club;
}

const OrgDirectoryCards: React.FC<Props> = ({ club }) => {
  const [liked, setLiked] = React.useState(false);
  const router = useRouter();

  const onClick = () => router.push(`/directory/${club.id}`);

  const like = () => setLiked((prev) => !prev);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-xs md:w-full h-full flex flex-col">
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-64">
        <Image
          src={getImageLink(club)}
          layout="fill"
          objectFit="cover"
          alt={club.name}
          className="select-none"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-2 rounded-lg">
          {30} Members
        </div>
        <button
          className={`absolute top-2 right-2 text-slate-800 font-bold py-1 px-2 rounded-lg  transition-colors ${
            liked ? 'bg-red-500' : 'bg-slate-300'
          }`}
          onClick={() => like()}
        >
          {'<3'}
        </button>
      </div>
      <div className="p-4 flex-grow">
        <h1 className="text-lg font-medium text-slate-800">{club.name}</h1>
        <h1 className="text-sm font-light text-slate-500 mb-1">
          Founded in {2020}
        </h1>
        <p className="text-xs text-slate-500 mt-3 line-clamp-3">Description</p>
        <p className="text-sm text-slate-600 mb-4">{club.description}</p>
      </div>
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl mr-2">
          Join
        </button>
        <button
          className="bg-blue-100 hover:bg-blue-200 text-slate-800 font-bold py-2 px-4 rounded-2xl"
          onClick={onClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
