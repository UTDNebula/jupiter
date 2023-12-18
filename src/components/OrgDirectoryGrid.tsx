import { type FC } from 'react';
import DirectoryOrgs from './DirectoryOrgs';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';
import InfiniteScrollGrid from './InfiniteScrollGrid';

interface Props {
  tag?: string;
}

const OrgDirectoryGrid: FC<Props> = async ({ tag }) => {
  const { clubs } = await api.club.all.query({ tag, limit: 20 });
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full flex-wrap justify-center gap-16 pb-4">
      {clubs.map((club) => (
        <DirectoryOrgs key={club.id} club={club} session={session} />
      ))}
      {clubs.length === 20 && (
        <InfiniteScrollGrid tag={tag} session={session} />
      )}
    </div>
  );
};

export default OrgDirectoryGrid;
