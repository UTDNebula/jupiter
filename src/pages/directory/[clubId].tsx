import ClubDocuments from '@src/components/ClubDocuments';
import Header from '@src/components/Header';
import OrgHeader from '@src/components/OrgHeader';
import OrgInfoSegment from '@src/components/OrgInfoSegment';
import Head from 'next/head';
import React from 'react';

const OrganizationPage = ({
  clubId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: club } = api.club.byId.useQuery({ id: clubId });
  if (!club) {
    return <div>Club not found</div>;
  }
  return (
    <>
      <Head>
        <title>{club.name} - Jupiter</title>
        <meta name="description" content={`${club.name} - Jupiter`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full md:pl-72">
        <Header />
        <div className="mb-5 flex flex-col space-y-8 px-7">
          <OrgHeader club={club} />
          <OrgInfoSegment club={club} />
          <ClubDocuments />
          <div className="flex h-full w-full flex-row items-center justify-between rounded-lg bg-blue-100 px-14 py-7">
            <div className="text-blue-primary text-lg font-bold">
              Promo text
            </div>
            <button className="bg-blue-primary flex w-fit flex-row items-center justify-center rounded-3xl py-2.5 pl-5 pr-6 text-center text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
              <PlusIcon />
              <div>Apply</div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationPage;

import { PlusIcon } from '@src/components/Icons';
import { appRouter } from '@src/server/api/root';
import { createInnerTRPCContext } from '@src/server/api/trpc';
import { db } from '@src/server/db';
import { api } from '@src/utils/api';
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type GetServerSidePropsContext,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const clubs = await db.query.club.findMany();
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
export const getStaticProps = async (
  ctx: GetServerSidePropsContext<{ clubId: string }>,
) => {
  const helper = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
  });
  const clubId = ctx.params?.clubId;
  if (typeof clubId !== 'string')
    return {
      notFound: true,
    };

  await helper.club.byId.prefetch({ id: clubId });
  return {
    props: {
      trpcState: helper.dehydrate(),
      clubId,
    },
  };
};
