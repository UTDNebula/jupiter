import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="flex col-start-2 items-start h-full p-3 col-end-[-1] row-start-1 text-5xl font-bold mb-5 w-full justify-between">
      <h1>Organization Directory</h1>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focuse:outline-blue-500"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
