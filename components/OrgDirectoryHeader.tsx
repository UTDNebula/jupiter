import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="md:flex col-start-1 md:col-start-2 md:row-end-1 align-top text-center h-full pl-3 col-end-[-1] row-start-1 row-end-2 md:text-3xl lg:text-5xl font-bold mb-5 w-full md:justify-between">
      <h1>Organization Directory</h1>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focuse:outline-blue-500"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
