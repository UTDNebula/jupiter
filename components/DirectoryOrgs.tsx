import DirectoryOrgTags from './DirectoryOrgTags';
import React, { FC } from 'react';
import { Org } from '../types/orgs';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  org: Org;
}
const OrgDirectoryCards: FC<Props> = ({ org }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/directory/${org.name}`);
  };
  return (
    <div className="card card-normal" onClick={onClick}>
      <div className="w-auto h-40 relative justify-center rounded-sm p-2">
        <figure>
          <Image
            src={org.imageLink}
            alt={org.name}
            sizes="100vw"
            layout="fill"
            objectFit="contain"
          />
        </figure>
      </div>
      <div className="card-body">
        <h4 className="card-title">{org.name}</h4>
        <div className="card-actions">
          {org.tags.map((tag, i) => (
            <DirectoryOrgTags key={i} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgDirectoryCards;
