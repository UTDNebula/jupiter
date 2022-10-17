import DirectoryOrgHeader from '../components/DirectoryOrgHeader';
import React, { FC } from 'react';
import ContactList from '../components/ContactList';
import orgData from '../demoOrgPageData.json';
import Image from 'next/image';

// Creating props for the component so that they can be passed in
// Whenever we are able to hook up the backend to the frontend
// To get org data from the backend, we can just pass in the org data
interface Props {
  org: typeof orgData;
}

// Replace orgData with org when we are able to get org data from the backend
const Directory: FC<Props> = ({ org }) => {
  return (
    <main>
      <div className="grid grid-cols-6 gap-4 p-3">
        <DirectoryOrgHeader name={orgData.name} tags={orgData.tags} />
      </div>
      <div className="grid grid-cols-6 gap-4 p-3 align-middle">
        <div className="col-span-2 p-3">
          <h1 className="text-3xl font-bold">About Us</h1>
          <Image
            src={orgData.imageLink}
            width="100%"
            height="100%"
            alt={orgData.name}
          />
        </div>
        <div className="flex col-span-2 p-3 justify-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            ut. Aliquid est et laboriosam nulla minima deleniti id, nostrum sint
            obcaecati! Repellat molestiae non facere nisi quis omnis ex optio.
          </p>
        </div>
        <div className="col-span-2 p-3">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <ContactList contactMethods={['Discord', 'Instagram', 'Email']} />
        </div>
      </div>
    </main>
  );
};

export default Directory;
