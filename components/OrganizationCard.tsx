import React from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';
import Link from "next/link";

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
      <Link href={`/organization?name=${encodeURIComponent(name)}`}>
        <a>
      <p>{name}</p>
      <div className="rectangle">
        <img src={`${imageLink}`} width="100%" />
      </div>
      </a>
      </Link>
      {tags.map((tag) => (
        <div className="tagContainer">
          <OrgDirectoryTag title={tag} color={''} />
        </div>
      ))}
    </div>
  );
}
