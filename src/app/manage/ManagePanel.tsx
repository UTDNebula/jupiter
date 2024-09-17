'use client';

import { type RouterOutputs } from '@src/trpc/shared';
import ClubCard from './ClubCard';
import { SearchIcon } from '@src/icons/Icons';
import { useState } from 'react';

const ManagePanel = ({
  clubs,
}: {
  clubs: RouterOutputs['club']['getOfficerClubs'];
}) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="flex flex-row">
        <div className="mr-3 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <div className="relative">
            <span className="absolute inset-y-0 flex items-center pl-3">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder={'Search your clubs'}
              className="h-10 w-full rounded-full border pl-10 pr-3 focus:outline-none"
              tabIndex={0}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-wrap gap-4 p-4">
        {clubs
          .filter((club) =>
            club.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
      </div>
    </>
  );
};

export default ManagePanel;
