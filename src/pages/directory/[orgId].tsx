import React from "react";
import DirectoryOrgHeader from "../../components/OrgHeader";
import Head from "next/head";
import Image from "next/image";
import ContactList from "../../components/ContactList";
import DbProvider from "../../backend_tools/db_provider";
import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
} from "next";
import type Club from "../../models/club";
import { getImage } from "../../models/club";

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
      <main>
        <div className="flex gap-4 p-10 md:grid md:grid-cols-6">
          <DirectoryOrgHeader name={club.name} tags={[]} />
        </div>
        <div className="flex gap-4 px-10 md:grid md:grid-cols-6">
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold md:text-3xl">
              About {club.name}
            </h1>
          </div>
          <div className="col-span-2 col-start-[-3] text-left">
            <h1 className="px-3 text-2xl font-bold md:text-3xl">Contact Us</h1>
          </div>
        </div>
        <div className="flex gap-4 p-10 md:grid md:grid-cols-6">
          <div className="md:col-span-2">
            <Image
              src={getImage(club)}
              alt={club.name}
              width={250}
              height={250}
            />
          </div>
          <div className="md:col-span-2">
            <p>{club.description}</p>
          </div>
          <div className="md:col-span-2">
            <ContactList contactMethods={["Discord", "Email", "Instagram"]} />
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const db = new DbProvider();
  const clubs = await db.getAllClubs();
  if (!clubs)
    return {
      paths: [],
      fallback: false,
    };
  const paths = clubs.map(({ id }) => ({
    params: { orgId: id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ club: Club }> = async ({
  params,
}) => {
  const db = new DbProvider();
  const orgId = params?.orgId as string;
  const club = await db.getClubById(orgId);
  if (!club)
    return {
      notFound: true,
    };
  return {
    props: { club },
  };
};
