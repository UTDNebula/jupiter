import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="md:col-start-2 md:col-end-[-1] grid md:grid-cols-3">
      <h1 className="align-middle text-3xl font-bold text-gray-800 col-start-1 col-span-3">
        Organization Directory
      </h1>
      <div className="md:col-start-[-1]">
        <input
          className="h-10 px-2 rounded-md border border-gray-300"
          type="text"
          placeholder="Search Organizations"
        />
      </div>
    </div>
  );
};

export default OrgDirectoryHeader;
