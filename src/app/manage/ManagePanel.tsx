'use client';

import { SearchBar } from '@src/components/SearchBar';
import { type RouterOutputs } from '@src/trpc/shared';
import ClubCard from './ClubCard';

const ManagePanel = ({
  clubs,
}: {
  clubs: RouterOutputs['club']['getOfficerClubs'];
}) => {
  return (
    <>
      <div className="flex flex-row">
        <SearchBar placeholder="Search your Clubs" />
      </div>
      <div className="flex h-full w-full flex-wrap gap-4 p-4">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </>
  );
};

export default ManagePanel;
