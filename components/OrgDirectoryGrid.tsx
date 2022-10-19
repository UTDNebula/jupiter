import DirectoryOrgs from './DirectoryOrgs';
import React from 'react';
import demoOrganizations from '../demoOrganizations.json';

const OrgDirectoryGrid = () => {
  return (
    <div className="col-start-1 md:col-start-2 col-end-[-1] row-start-1 row-end-[-1] md:w-full grid grid-cols-1 md:grid-cols-4 h-full md:h-[70vh] overflow-y-scroll">
      {demoOrganizations.map((org, i) => (
        <DirectoryOrgs key={i} org={org} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
