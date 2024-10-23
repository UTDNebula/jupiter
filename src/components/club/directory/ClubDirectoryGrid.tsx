import ClubCard from '../ClubCard';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';
import InfiniteScrollGrid from './InfiniteScrollGrid';
import ScrollTop from './ScrollTop';
import { SelectClub } from '@src/server/db/models';
import { FC } from 'react';

interface Props {
  tag?: string;
}

const ClubDirectoryGrid: FC<Props> = async ({ tag }) => {
  const { clubs } = await api.club.all({ tag, limit: 9 });
  const session = await getServerAuthSession();

  return (
    <div className="grid w-full auto-rows-fr grid-cols-[repeat(auto-fill,320px)] justify-center gap-16 pb-4">
      {clubs.map((club: SelectClub) => (
        <ClubCard key={club.id} club={club} session={session} priority />
      ))}
      {clubs.length === 9 && <InfiniteScrollGrid tag={tag} session={session} />}
      <ScrollTop />
    </div>
  );
};

export default ClubDirectoryGrid;
