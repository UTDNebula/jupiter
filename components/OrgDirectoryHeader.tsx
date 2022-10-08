import React from 'react';

const OrgDirectoryHeader = () => {
  return (
<<<<<<< HEAD
    <div className="md:flex col-start-1 md:col-start-2 md:row-end-1 self-start col-end-[-1] row-start-1 row-end-2 font-bold md:justify-between">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Organization Directory
      </h1>
=======
    <div className="flex col-start-2 items-start h-full p-3 col-end-[-1] row-start-1 md:text-3xl lg:text-5xl font-bold mb-5 w-full justify-between">
      <h1>Organization Directory</h1>
>>>>>>> cc11936 (Update grid to be more responsive and further break down org cards and org tags with small updates)
      <input
        className="h-10 px-2 rounded-md border border-gray-300"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
