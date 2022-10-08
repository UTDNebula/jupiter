import React from 'react';
const mockTags = ['Tag'];
const X = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const OrgDirectoryTags = () => {
  return (
    <div className="flex flex-col row-start-1 col-start-2 col-end-[-1] w-full h-full justify-center p-3">
      <p className="text-sm font-light">Tags:</p>
      <div className="flex flex-wrap">
        {mockTags.map((tag, i) => (
          <div
            key={i}
            className="flex justify-between items-center w-24 h-8 m-1 text-sm p-4 font-light rounded-2xl bg-blue-400 hover:bg-blue-500 hover:cursor-pointer"
          >
            {tag}
            <X />
          </div>
        ))}
        <button className="flex justify-between items-center w-24 h-8 m-1 text-sm p-4 font-light rounded-2xl bg-gray-400 hover:bg-gray-500 hover:cursor-pointer">
          <p>Add Tags</p>
        </button>
      </div>
    </div>
  );
};

export default OrgDirectoryTags;
