import { type FC } from "react";
import DirectoryOrgTags from "./DirectoryOrgTags";

interface Props {
  name: string;
  tags: string[];
}

const DirectoryOrgHeader: FC<Props> = ({ name, tags }) => {
  return (
    <>
      <div className="md:col-span-4">
        <h1 className="text-2xl font-bold md:text-5xl">{name}</h1>
      </div>
      <div className="flex p-3 md:col-start-[-1]">
        {tags.map((tag, i) => (
          <DirectoryOrgTags key={i} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default DirectoryOrgHeader;
