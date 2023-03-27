import { DropDownIcon } from './Dropdown';

const OrgDirectorySidebar = () => {
  return (
    <div className="hidden md:flex flex-col md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 w-full mb-5">
      <div className="flex flex-col mb-5 text-2xl font-light">
        <h3>Filters</h3>
      </div>
      <div className="flex flex-col mb-5 text-xl font-light border-b-2 border-gray-300">
        <div className="flex flex-row justify-between align-middle py-3">
          <h4 className="text-gray-700">Category</h4>
          <DropDownIcon />
        </div>
      </div>
    </div>
  );
};

export default OrgDirectorySidebar;
