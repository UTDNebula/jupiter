import React from 'react';

const DropDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 text-gray-400 hover:cursor-pointer"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const OrgDirectorySidebar = () => {
  return (
    <div className="md:flex hidden flex-col md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-2 w-full mb-5">
      <div className="flex flex-col mb-5 text-2xl font-ligh">
        <h3>Filters</h3>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle">
          <h4>Tags</h4>
          <DropDown />
        </div>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle">
          <h4>Category</h4>
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default OrgDirectorySidebar;
