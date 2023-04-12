import React from 'react';

const Header = () => {
  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-5 content-between py-3">
      <input
        type="text"
        placeholder="Search for clubs"
        className="w-1/2 md:w-1/3 lg:w-1/4 h-10 rounded-lg border border-gray-300 px-3 focus:outline-none"
        tabIndex={0}
      />
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default Header;
