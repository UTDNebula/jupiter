import Head from 'next/head';
import Image from 'next/image';
import { EventHeader } from '@src/components/Header';

const EventPage = ({
  club,
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!event) {
    return <div>Event Not Found.</div>;
  } else if (!club) {
    return <div>Club Does Not Exist.</div>;
  }

  return (
    <>
      <Head>
        <title>{event.name} - Jupiter</title>
        <meta name="description">{event.name} - Jupiter</meta>
      </Head>
      <main className="w-full md:pl-72">
        <EventHeader />
        <div className="mb-5 flex flex-col space-y-6 px-7">
          <div className="relative h-full w-full rounded-xl bg-slate-50 p-10 shadow-lg">
            <Image src={club.image} width={100} height={100} alt="club image" />
            <hr className="my-3 mt-5 h-[1px] border-0 bg-black" />
            <div className="mb-3 flex w-full justify-between">
              <div>
                <a
                  className="text-4xl font-semibold"
                  href={`/directory/${club.id}`}
                >
                  {club.name}
                </a>
                <p className="text-2xl font-semibold">{event.name}</p>
              </div>
              <p className="text-2xl font-semibold">
                {new Date(event.startTime).toString().substring(0, 24)}
              </p>
            </div>
            <p>{event.description}</p>
            <div className="float-right mt-24">
              <button className="mr-3 rounded-lg border-[1px] border-black bg-white px-3 py-1">
                Contact Us
              </button>
              <button className="rounded-lg border-[1px] border-black bg-white px-3 py-1">
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default EventPage;

import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from 'next';

import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import { club, events } from '@src/server/db/schema';
import { type SelectClub, type SelectEvent } from '@src/server/db/models';

export const getServerSideProps: GetServerSideProps<{
  club?: SelectClub;
  event: SelectEvent;
}> = async ({ params }) => {
  const matchedEvent = await db.query.events.findFirst({
    where: eq(events.id, params?.eventId as string),
  });

  if (!matchedEvent) return { notFound: true };

  const matchedClub = await db.query.club.findFirst({
    where: eq(club.id, matchedEvent.clubId),
  });

  if (!matchedClub) return { props: { club: undefined, event: matchedEvent } };

  return {
    props: {
      club: matchedClub,
      event: matchedEvent,
    },
  };
};
