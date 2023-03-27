import { type FC } from "react";

const OrgDirectoryHeader: FC<{
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="col-start-2 col-end-7 grid grid-cols-3 items-center gap-4 md:col-end-[-1]">
      <h1 className="col-span-3 text-center text-3xl font-bold text-gray-800 md:col-span-2 md:col-start-1 md:text-left">
        Organization Directory
      </h1>
      <div className="col-span-3 md:col-start-3">
        <input
          className="h-10 w-full rounded-md border border-gray-300 px-2"
          type="text"
          placeholder="Search Organizations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          tabIndex={1}
        />
      </div>
    </div>
  );
};

export default OrgDirectoryHeader;
