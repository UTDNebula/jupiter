import React, { type FC } from 'react';

const ClubDocuments: FC = () => {
  return (
    <div className="m-5 mx-auto w-11/12 rounded-lg bg-slate-100 p-10">
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
    <div className="mt-5 flex flex-row items-center justify-between rounded-lg bg-slate-200 p-5">
      {/* Document Icon empty div for now*/}
      <div className="flex items-center">
        <div className="m-2 h-10 w-10 rounded-lg bg-slate-200"></div>
        <h1 className="text-lg font-medium">{name}</h1>
      </div>
      <div className="ml-5 flex flex-col items-start justify-center">
        <button className="m-3 rounded-full bg-blue-200 px-3 py-1 font-semibold text-blue-500 transition-colors hover:bg-blue-300 hover:text-blue-900">
          View
        </button>
      </div>
    </div>
  );
};

export default ClubDocuments;
