import React from 'react';
import { useRouter } from 'next/router';
import DirectoryOrgHeader from '../../components/OrgHeader';
import orgData from '../../demoOrganizations.json';
import Head from 'next/head';
import Image from 'next/image';
import ContactList from '../../components/ContactList';

const OrganizationPage = () => {
  const router = useRouter();
  const orgName = router.query.orgName as string;
  const org = orgData.find((org) => org.name === orgName);
  if (!org) {
    //router.back();
    return null;
  }
  return (
    <>
      <Head>
        <title>{org.name} - Jupiter</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex md:grid md:grid-cols-6 gap-4 p-10">
          <DirectoryOrgHeader name={org.name} tags={org.tags} />
        </div>
        <div className="flex md:grid md:grid-cols-6 gap-4 px-10">
          <div className="md:col-span-3">
            <h1 className="text-2xl md:text-3xl font-bold">About Us</h1>
          </div>
          <div className="col-start-[-3] col-span-2 text-left">
            <h1 className="text-2xl md:text-3xl font-bold px-3">Contact Us</h1>
          </div>
        </div>
        <div className="flex md:grid md:grid-cols-6 gap-4 p-10">
          <div className="md:col-span-2">
            <Image
              src={org.imageLink}
              alt={org.name}
              width={250}
              height={250}
            />
          </div>
          <div className="md:col-span-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              eaque illum natus voluptatum adipisci quisquam. Autem nulla eos
              amet itaque assumenda praesentium cupiditate? Illum nesciunt neque
              vero, odio saepe ipsum.
            </p>
          </div>
          <div className="md:col-span-2">
            <ContactList contactMethods={['Discord', 'Email', 'Instagram']} />
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationPage;
