import DirectoryOrgs from './DirectoryOrgs';
import React from 'react';
import demoOrganizations from '../demoOrganizations.json';

const OrgDirectoryGrid = () => {
  return (
    <div className="col-start-2 col-end-[-1] row-start-2 row-end-[-1] w-full grid grid-cols-4 h-full overflow-scroll">
      {demoOrganizations.map((org, i) => (
        <DirectoryOrgs key={i} org={org} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
