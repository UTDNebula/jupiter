'use client';
import { api } from '@src/trpc/react';
import type { SelectClub as Club } from '@src/server/db/models';
import { type Session } from 'next-auth';
import HorizontalClubCard from '@src/components/club/HorizontalClubCard';

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
    return (
      <div className="text-center text-4xl font-bold text-slate-500">
        No Search Results Found
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 pb-4">
      {data.map((club: Club) => (
        <HorizontalClubCard key={club.id} club={club} session={session} />
      ))}
    </div>
  );
};
