'use client';
import { api } from '@src/trpc/react';
import type { SelectClub as Club } from '@src/server/db/models';
import { type Session } from 'next-auth';
import ClubCard from './club/ClubCard';

interface ClubSearchComponentProps {
  userSearch: string;
  session: Session | null;
}

export const ClubSearchComponent = ({
  userSearch,
  session,
}: ClubSearchComponentProps) => {
  const { data } = api.club.byNameNoLimit.useQuery(
    { name: userSearch },
    { enabled: !!userSearch },
  );

  if (!data) {
    return <p />;
  }
  if (data.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div className="grid w-full auto-rows-fr grid-cols-[repeat(auto-fill,320px)] justify-center gap-16 pb-4">
      {data.map((club: Club) => (
        <ClubCard key={club.id} club={club} session={session} priority />
      ))}
    </div>
  );
};