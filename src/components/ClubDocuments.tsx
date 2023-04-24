import React, { type FC } from 'react';

const ClubDocuments: FC = () => {
  return (
    <div className="w-11/12 mx-auto bg-slate-100 rounded-lg p-10 m-5">
      <h1 className="text-2xl font-medium mt-5">Club Documents</h1>
      <p className="text-md font-thin mt-5">
        Here you can find all the documents related to this club. You can view
        them or download them.
      </p>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-5 mt-5">
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
    <div className="flex flex-row justify-between items-center mt-5 bg-slate-200 rounded-lg p-5">
      {/* Document Icon empty div for now*/}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-slate-200 rounded-lg m-2"></div>
        <h1 className="text-lg font-medium">{name}</h1>
      </div>
      <div className="flex flex-col justify-center items-start ml-5">
        <button className="bg-blue-200 rounded-full px-3 py-1 m-3 text-blue-500 font-semibold hover:bg-blue-300 hover:text-blue-900 transition-colors">
          View
        </button>
      </div>
    </div>
  );
};

export default ClubDocuments;
