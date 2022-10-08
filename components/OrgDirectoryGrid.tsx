import DirectoryOrgs from './DirectoryOrgs';
import React from 'react';
import demoOrganizations from '../demoOrganizations.json';

const OrgDirectoryGrid = () => {
  return (
<<<<<<< HEAD
    <div className="col-start-1 md:col-start-2 col-end-[-1] row-start-2 row-end-[-1] md:w-full grid grid-cols-1 md:grid-cols-4 h-full overflow-y-scroll">
=======
    <div className="col-start-2 col-end-[-1] row-start-2 row-end-[-1] w-full grid grid-cols-4 h-full overflow-scroll">
>>>>>>> cc11936 (Update grid to be more responsive and further break down org cards and org tags with small updates)
      {demoOrganizations.map((org, i) => (
        <DirectoryOrgs key={i} org={org} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
