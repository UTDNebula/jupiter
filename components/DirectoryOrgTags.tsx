import React, { FC } from 'react';

interface Props {
  tag: string;
}

const DirectoryOrgTags: FC<Props> = ({ tag }) => {
  return (
    <div className="flex justify-between items-center md:w-auto h-8 m-1 text-xs md:text-sm p-4 font-light rounded-2xl bg-blue-400 hover:bg-blue-500 hover:cursor-pointer">
      <p className="text-white font-normal">{tag}</p>
    </div>
  );
};

export default DirectoryOrgTags;
