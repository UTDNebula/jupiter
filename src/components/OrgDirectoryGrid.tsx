import DirectoryOrgs from './DirectoryOrgs';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';
import InfiniteScrollGrid from './InfiniteScrollGrid';
import ScrollTop from './ScrollTop';

export interface Props {
  tag: string;
}

const OrgDirectoryGrid = async ({ tag }: Props) => {
  const { clubs } = await api.club.all({ tag, limit: 9 });
  const session = await getServerAuthSession();

  return (
    <div className="grid w-full auto-rows-fr grid-cols-[repeat(auto-fill,320px)] justify-center gap-16 pb-4">
      {clubs.map((club) => (
        <DirectoryOrgs key={club.id} club={club} session={session} priority />
      ))}
      {clubs.length === 9 && <InfiniteScrollGrid tag={tag} session={session} />}
      <ScrollTop />
    </div>
  );
};

export default OrgDirectoryGrid;