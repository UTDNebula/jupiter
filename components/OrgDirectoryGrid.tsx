import Club from '../models/club';
import DirectoryOrgs from './DirectoryOrgs';
import React, { FC } from 'react';

const OrgDirectoryGrid: FC<{ clubs: Club[] }> = ({ clubs }) => {
  return (
    <div className="grid grid-cols-3 py-3 px-2">
      {clubs.map((club, key) => (
        <DirectoryOrgs key={key} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
