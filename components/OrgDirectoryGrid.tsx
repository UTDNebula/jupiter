import Club from '../models/club';
import DirectoryOrgs from './DirectoryOrgs';
import React, { FC } from 'react';

const OrgDirectoryGrid: FC<{ clubs: Club[] }> = ({ clubs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 py-3 px-2 justify-items-center items-center">
      {clubs.map((club, key) => (
        <DirectoryOrgs key={key} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
