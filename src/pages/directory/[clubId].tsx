import OrgInfoSegment from '@src/components/OrgInfoSegment';
import OrgHeader from '@src/components/OrgHeader';
import React from 'react';
import Head from 'next/head';
import ClubDocuments from '@src/components/ClubDocuments';

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

import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
} from 'next';
import DbProvider from '../../backend_tools/db_provider';
import type Club from '../../models/club';

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
