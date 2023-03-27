import DirectoryOrgs from "./DirectoryOrgs";
import { type FC } from "react";
import type Club from "../models/club";

const OrgDirectoryGrid: FC<{ clubs: Club[] }> = ({ clubs }) => {
  return (
    <div className="col-start-1 col-end-[-1] grid h-full grid-cols-1 gap-6 overflow-y-scroll md:col-start-2 md:w-full md:grid-cols-4">
      {clubs?.map((club) => (
        <DirectoryOrgs key={club.id} club={club} />
      ))}
    </div>
  );
};

export default OrgDirectoryGrid;
