import React, { FC } from 'react';
import DirectoryOrgTags from './DirectoryOrgTags';

interface Props {
  name: string;
  tags: string[];
}

const DirectoryOrgHeader: FC<Props> = ({ name, tags }) => {
  return (
    <div className="navbar bg-base-100">
      <h1 className="navbar-start md:text-2xl">{name}</h1>
      <div className="md:col-start-[-1] p-3 flex">
        {tags.map((tag, i) => (
          <DirectoryOrgTags key={i} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default DirectoryOrgHeader;
