import React from 'react';

interface OrgDirectoryTagProps {
  title: string;
  color: string;
}

export default function OrgDirectoryTag({ title }: OrgDirectoryTagProps) {
  return <div className="orgTag">{title}</div>;
}
