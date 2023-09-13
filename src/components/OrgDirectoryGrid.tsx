import { type Club } from '@src/models/club';
import DirectoryOrgs from './DirectoryOrgs';
import React, { type FC } from 'react';

const OrgDirectoryGrid: FC<{ clubs: Club[] }> = ({ clubs }) => {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-2 px-2 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {clubs.map((club, key) => (
        <DirectoryOrgs key={key} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
