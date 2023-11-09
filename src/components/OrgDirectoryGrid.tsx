import DirectoryOrgs from './DirectoryOrgs';
import { api } from '@src/trpc/server';

const OrgDirectoryGrid = async () => {
  const clubs = await api.club.all.query();
  return (
    <div className="flex w-full flex-wrap justify-center gap-16">
      {clubs.map((club) => (
        <DirectoryOrgs key={club.id} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
