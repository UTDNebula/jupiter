import DirectoryOrgTags from './DirectoryOrgTags';
import React, { FC } from 'react';
import { Org } from '../types/orgs';
import Image from 'next/image';

interface Props {
  org: Org;
}
const OrgDirectoryCards: FC<Props> = ({ org }) => {
  return (
    <div className="md:w-full h-auto flex flex-col justify-between items-center p-5 m-5 rounded-2xl">
      <h4 className="text-lg font-bold text-center">{org.name}</h4>
      <div className="w-full h-40 relative justify-center">
        <Image
          src={org.imageLink}
          width="100%"
          height="100%"
          alt={org.name}
          className="rectangle"
        />
      </div>
      <div className="flex flex-wrap md:flex-row align-middle justify-center w-full">
        {org.tags.map((tag, i) => (
          <DirectoryOrgTags key={i} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
