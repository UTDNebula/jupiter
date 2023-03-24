import DirectoryOrgs from './DirectoryOrgs';
import React, { FC } from 'react';
import Club from '../models/club';

const OrgDirectoryGrid: FC<{ clubs: Club[] }> = ({ clubs }) => {
  return (
    <div className="col-start-1 md:col-start-2 col-end-[-1] md:w-full grid grid-cols-1 md:grid-cols-4 h-full overflow-y-scroll gap-6">
      {clubs?.map((club) => (
        <DirectoryOrgs key={club.id} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
