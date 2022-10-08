import React, { FC } from 'react';
import DirectoryOrgTags from './components/DirectoryOrgTags';

interface Props {
  name: string;
  tags: string[];
}

const DirectoryOrgHeader: FC<Props> = ({ name, tags }) => {
  return (
    <>
      <div className="col-span-3 p-3">
        <h1 className="text-5xl font-bold">{name}</h1>
      </div>
      <div className="col-start-[-1] p-3">
        {tags.map((tag, i) => (
          <DirectoryOrgTags key={i} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default DirectoryOrgHeader;
