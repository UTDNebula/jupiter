import React from 'react';
import demoOrganizations from '../demoOrganizations.json';
import Image from 'next/image';

const OrgDirectoryGrid = () => {
  return (
    <div className="col-start-2 col-end-[-1] row-start-2 row-end-[-1] w-full grid grid-cols-4 h-auto overflow-scroll">
      {demoOrganizations.map((org, i) => (
        <div key={i} className="org-card w-full">
          <h4>{org.name}</h4>
          <div className="rectange">
            <Image
              src={org.imageLink}
              width="100%"
              height="100%"
              alt={org.name}
              className="rectangle"
            />
          </div>
          <div className="flex flex-row align-middle">
            {org.tags.map((tag, i) => (
              <div
                key={i}
                className="flex justify-between items-center w-auto h-8 m-1 text-sm p-4 font-light rounded-2xl bg-blue-400 hover:bg-blue-500 hover:cursor-pointer"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
