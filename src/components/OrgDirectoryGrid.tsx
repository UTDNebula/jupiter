import DirectoryOrgs from './DirectoryOrgs';
import { api } from '@src/trpc/server';
import MoreDirectoryOrgs from './MoreDirectoryOrgs';

const OrgDirectoryGrid = async ({ tag }: { tag?: string }) => {
  const clubs = await api.club.all.query({ tag });
  return (
    <div className="flex w-full flex-wrap gap-16">
      {clubs.map((club) => (
        <DirectoryOrgs key={club.id} club={club} />
      ))}
      <MoreDirectoryOrgs tag={tag} />
    </div>
  );
};

export default OrgDirectoryGrid;
