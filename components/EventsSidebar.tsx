import React from 'react';
import { DropDownIcon } from './Dropdown';
const EventsSidebar = () => {
  return (
    <div className="md:flex hidden flex-col md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-1 mb-5">
      <div className="flex flex-col mb-5 text-2xl font-light">
        <h3>Filters</h3>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle">
          <h4>Time</h4>
          <DropDownIcon />
        </div>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle">
          <h1 className="text-xl">Day</h1>
          <DropDownIcon />
        </div>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle">
          <h1 className="text-xl">Category</h1>
          <DropDownIcon />
        </div>
      </div>
    </div>
  );
};

export default EventsSidebar;
