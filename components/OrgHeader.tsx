import React, { FC } from 'react';
import DirectoryOrgTags from './DirectoryOrgTags';

interface Props {
  name: string;
  tags: string[];
}

const DirectoryOrgHeader: FC<Props> = ({ name, tags }) => {
  return (
    <>
      <div className="md:col-span-3 p-3">
        <h1 className="text-2xl md:text-5xl font-bold">{name}</h1>
      </div>
      <div className="md:col-start-[-1] p-3">
        {tags.map((tag, i) => (
          <DirectoryOrgTags key={i} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default DirectoryOrgHeader;
