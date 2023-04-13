import React from 'react';
import { useRouter } from 'next/router';
import DirectoryOrgHeader from '../../components/OrgHeader';
import Head from 'next/head';
import Image from 'next/image';
import ContactList from '../../components/ContactList';

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
        <div className="block">
          <DirectoryOrgHeader club={club} />
        </div>
        <div className="w-11/12 mx-auto bg-slate-100 rounded-lg p-10">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/3">
              <Image
                src={getImageLink(club)}
                alt="Picture of the author"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-medium mt-5">Description</h1>
              <div className="w-36 flex justify-between ">
                <p className="text-sm text-slate-400 mt-5">Name</p>
                <p className="text-sm text-slate-600 mt-5 text-right">
                  {club.name}
                </p>
              </div>
              <div className="w-36 flex justify-between ">
                <p className="text-sm text-slate-400 mt-5">Founded</p>
                <p className="text-sm text-slate-600 mt-5 text-right">
                  May 2020
                </p>
              </div>
              <div className="w-36 flex justify-between ">
                <p className="text-sm text-slate-400 mt-5">President</p>
                <p className="text-sm text-slate-600 mt-5 text-right">
                  John Doe
                </p>
              </div>
              <div className="w-36 flex justify-between ">
                <p className="text-sm text-slate-400 mt-5">Active</p>
                <p className="text-sm text-slate-600 mt-5 text-right">
                  Present
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              dolorum iste ut cum debitis similique minus eaque odit inventore
              quis tempora maiores voluptatum saepe, eligendi sint veniam,
              voluptatibus accusamus beatae? Ipsam veritatis facere, porro
              aliquam ullam sint repudiandae culpa iusto aperiam corporis,
              soluta fugit in minus ut reprehenderit dolor modi dolorum. Sit
              blanditiis ad porro nihil, voluptate laudantium nisi? Corrupti.
              Distinctio, quaerat, facere dignissimos assumenda praesentium
              officiis consectetur animi beatae sunt illo consequatur quae ex
              nostrum incidunt adipisci earum quia non accusantium dolor libero.
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h1 className="text-2xl font-medium mt-5">Leadership</h1>
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center align-middle">
                  <Image
                    src={getImageLink(club)}
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    className="rounded-full m-3"
                  />
                  <div className="flex flex-col justify-center items-center align-middle mx-5">
                    <p className="text-sm text-slate-600 mt-5 text-right">
                      John Doe
                    </p>
                    <p className="text-sm text-slate-400 mt-5 text-right">
                      President
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center align-middle">
                  <Image
                    src={getImageLink(club)}
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    className="rounded-full m-3"
                  />
                  <div className="flex flex-col justify-center items-center align-middle mx-5">
                    <p className="text-sm text-slate-600 mt-5 text-right">
                      John Doe
                    </p>
                    <p className="text-sm text-slate-400 mt-5 text-right">
                      Treasurer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
