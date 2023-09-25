import React, { type FC } from 'react';

const ClubDocuments: FC = () => {
  return (
    <div className=" rounded-lg bg-slate-100 p-10">
      <h1 className="mt-5 text-2xl font-medium">Club Documents</h1>
      <p className="text-md mt-5 font-thin">
        Here you can find all the documents related to this club. You can view
        them or download them.
      </p>
      <div className="mt-5 flex flex-col gap-5 md:grid md:grid-cols-2">
        {[
          'Constitution',
          'Agreement',
          'Voting',
          'Random1',
          'Random2',
          'Random3',
        ].map((documentName) => (
          <Document key={documentName} name={documentName} />
        ))}
      </div>
    </div>
  );
};

const Document: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="mt-5 flex flex-row items-center rounded-lg bg-slate-200 p-7">
      {/* Document Icon empty div for now*/}
      <div className="flex flex-col items-center md:flex-row">
        <h1 className="text-xs font-medium">{name}</h1>
      </div>
      <div className="ml-auto flex flex-col items-start justify-center">
        <button className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-500 transition-colors hover:bg-blue-300 hover:text-blue-900">
          View
        </button>
      </div>
    </div>
  );
};

export default ClubDocuments;
