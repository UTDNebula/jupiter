import React from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';

interface OrganizationCardProps {
  name: string;
  imageLink: string;
  tags: string[];
}

export default function OrganizationCard({
  name,
  imageLink,
  tags,
}: OrganizationCardProps) {
  return (
    <div className="org-card">
      <p>{name}</p>
      <div className="rectangle">
        <img src={`${imageLink}`} width="100%" />
      </div>
      {tags.map((tag) => (
        <div className="tagContainer">
          <OrgDirectoryTag title={tag} color={''} />
        </div>
      ))}
    </div>
  );
}
