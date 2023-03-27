import { type FC } from "react";

interface Props {
  tag: string;
}

const DirectoryOrgTags: FC<Props> = ({ tag }) => {
  return (
    <div className="m-1 flex h-8 items-center justify-between rounded-2xl bg-blue-400 p-4 text-xs font-light hover:cursor-pointer hover:bg-blue-500 md:w-auto md:text-sm">
      <p className="font-normal text-white">{tag}</p>
    </div>
  );
};

export default DirectoryOrgTags;
