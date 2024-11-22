import { api } from '@src/trpc/server';
import ClubCard, { ClubCardSkeleton } from '../ClubCard';
import type { Session } from 'next-auth';
import InfiniteScrollGrid from './InfiniteScrollGrid';

type Props = {
  session: Session | null;
  tag?: string;
};

export default async function ClubDirectoryGrid({ session, tag }: Props) {
  const data = await api.club.all({ tag, limit: 9 });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.clubs.map((club) => (
        <ClubCard key={club.id} club={club} session={session} priority />
      ))}
      {data.clubs.length === 0 && <div>No clubs found</div>}
      {data.clubs.length === 9 && <InfiniteScrollGrid session={session} />}
    </div>
  );
}

export function ClubDirectoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <ClubCardSkeleton key={index} />
      ))}
    </div>
  );
}
