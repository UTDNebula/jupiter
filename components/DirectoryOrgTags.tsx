import React, { FC } from 'react';

interface Props {
  tag: string;
}

const DirectoryOrgTags: FC<Props> = ({ tag }) => {
  return (
    <div className="badge badge-secondary md:badge-lg">
      <p className="text-white font-bold">{tag}</p>
    </div>
  );
};

export default DirectoryOrgTags;
