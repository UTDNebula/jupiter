import { DropDownIcon } from './Dropdown';
import React from 'react';

const OrgDirectorySidebar = () => {
  return (
    <div className="hidden p-5 md:flex md:flex-col w-40">
      <h3 className="font-medium text-lg cursor-pointer">Filters</h3>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-accent">
        <div className="flex flex-row justify-between align-middle">
          <h4>Tags</h4>
          <DropDownIcon />
        </div>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-y-2 border-accent">
        <div className="flex flex-row justify-between align-middle">
          <h4>Category</h4>
          <DropDownIcon />
        </div>
      </div>
    </div>
  );
};

export default OrgDirectorySidebar;
