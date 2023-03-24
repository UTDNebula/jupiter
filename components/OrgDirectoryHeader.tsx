import { FC } from 'react';

const OrgDirectoryHeader: FC<{
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="col-start-2 col-end-7 md:col-end-[-1] grid grid-cols-3 gap-4 items-center">
      <h1 className="text-3xl font-bold text-gray-800 col-span-3 md:col-start-1 md:col-span-2 text-center md:text-left">
        Organization Directory
      </h1>
      <div className="col-span-3 md:col-start-3">
        <input
          className="h-10 px-2 rounded-md border border-gray-300 w-full"
          type="text"
          placeholder="Search Organizations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrgDirectoryHeader;
