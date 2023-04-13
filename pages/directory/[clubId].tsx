import OrgInfo from '../../components/OrgInfo';
import React from 'react';
import DirectoryOrgHeader from '../../components/OrgHeader';
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
        <DirectoryOrgHeader club={club} />
        <OrgInfo club={club} />
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
export const getStaticProps: GetStaticProps<{ club: Club }> = async (ctx) => {
  const clubId = ctx.params?.clubId as string;
  const db = new DbProvider();
  const club = await db.getClub(clubId);

  return {
    props: {
      club,
    },
  };
};
