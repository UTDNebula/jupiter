import React from 'react';
import DirectoryOrgHeader from '../../components/OrgHeader';
import Head from 'next/head';
import Image from 'next/image';
import ContactList from '../../components/ContactList';
import DbProvider from '../../backend_tools/db_provider';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Club, { getImage } from '../../models/club';

const OrganizationPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const org = props.club;
  return (
    <>
      <Head>
        <title>{org.name} - Jupiter</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex md:grid md:grid-cols-6 gap-4 p-10">
          <DirectoryOrgHeader name={org.name} tags={[]} />
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
              src={getImage(org)}
              alt={org.name}
              width={250}
              height={250}
            />
          </div>
          <div className="md:col-span-2">
            <p>{org.description}</p>
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

// This function is called at build time
// Ensures that the page is generated for each club
export const getStaticPaths: GetStaticPaths = async () => {
  const db = new DbProvider();
  // Grab all the clubs
  const clubs = await db.getAllClubs();
  if (!clubs)
    return {
      paths: [],
      fallback: false,
    };

  // Create an array of paths for each club
  const paths = clubs.map((club) => ({
    params: { orgName: club.name },
  }));

  return { paths, fallback: false };
};

// This function is called at build time
// It is used to generate the props for the page
export const getStaticProps: GetStaticProps<{ club: Club }> = async (ctx) => {
  const db = new DbProvider();
  const orgName = ctx?.params?.orgName as string;
  const clubs = await db.getClubsByName(orgName);
  const club = clubs[0];

  // If the club doesn't exist, return a 404
  if (!club)
    return {
      notFound: true,
    };

  return {
    props: {
      club,
    },
  };
};
