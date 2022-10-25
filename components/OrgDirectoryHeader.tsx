import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="md:flex md:justify-between md:pl-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Organization Directory
      </h1>
      <input
        className="h-10 px-2 rounded-md border border-gray-300"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
