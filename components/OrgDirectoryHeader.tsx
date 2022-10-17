import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="flex col-start-2 items-start h-full p-3 col-end-[-1] row-start-1 md:text-3xl lg:text-5xl font-bold mb-5 w-full justify-between">
      <h1>Organization Directory</h1>
      <input
        className="h-10 px-2 rounded-md border border-gray-300"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
