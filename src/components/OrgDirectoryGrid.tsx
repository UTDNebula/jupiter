import DirectoryOrgs from './DirectoryOrgs';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';

const OrgDirectoryGrid = async ({ tag }: { tag?: string }) => {
  const session = await getServerAuthSession();
  let clubs;
  if(session){
    clubs = await api.club.allButJoined.query({ tag });
  } else{
    clubs = await api.club.all.query({ tag });
  }
  return (
    <div className="flex w-full flex-wrap justify-center gap-16">
      {clubs.map((club) => (
        <DirectoryOrgs key={club.id} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
