'use client';

import { api } from '@src/trpc/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ClubCard, { ClubCardSkeleton } from '../ClubCard';
import type { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

export default function ClubDirectoryGrid({ session }: Props) {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const { data, refetch } = api.club.all.useQuery(
    { tag: tag ?? undefined },
    { staleTime: 1000 * 60 * 5 }
  );

  useEffect(() => {
    void refetch();
  }, [tag, refetch]);

  if (!data) return <ClubDirectoryGridSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.clubs.map((club) => (
        <ClubCard key={club.id} club={club} session={session} priority />
      ))}
    </div>
  );
}

function ClubDirectoryGridSkeleton() {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 12 }).map((_, index) => (
      <ClubCardSkeleton key={index} />
      ))}
    </div>
}
