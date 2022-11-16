import React from 'react';

const OrgDirectoryHeader = () => {
  return (
    <div className="navbar">
      <h1 className="navbar-start md:text-2xl font-bold">Organizations</h1>
      <input
        className="navbar-end input input-primary"
        type="text"
        placeholder="Search Organizations"
      />
    </div>
  );
};

export default OrgDirectoryHeader;
