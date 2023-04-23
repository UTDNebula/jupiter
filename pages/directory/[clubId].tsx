import OrgInfoSegment from '../../components/OrgInfoSegment';
import React from 'react';
import OrgHeader from '../../components/OrgHeader';
import Head from 'next/head';
import ClubDocuments from '../../components/ClubDocuments';

const OrganizationPage = ({
  club,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{club.name} - Jupiter</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="md:pl-72">
        <OrgHeader club={club} />
        <OrgInfoSegment club={club} />
        <ClubDocuments />
      </main>
    </>
  );
};

export default OrganizationPage;

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import DbProvider from '../../backend_tools/db_provider';
import Club, { getImageLink } from '../../models/club';

export const getStaticPaths: GetStaticPaths = async () => {
  const db = new DbProvider();
  const clubs = await db.getAllClubs();

  if (!clubs)
    return {
      paths: [],
      fallback: false,
    };

  const paths = clubs.map((club) => ({
    params: { clubId: club.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<{ club: Club }> = async (
  context,
) => {
  const clubId = context.params?.clubId as string;
  const db = new DbProvider();
  const club = await db.getClub(clubId);

  return {
    props: {
      club,
    },
  };
};
