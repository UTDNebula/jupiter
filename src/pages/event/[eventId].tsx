import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { EventHeader } from '@src/components/Header';

const EventPage = ({
  eventId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: event } = api.event.byId.useQuery({ id: eventId });

  if (!event) {
    return <div>Event Not Found.</div>;
  }

  const club = event.club;
  return (
    <>
      <Head>
        <title>{event.name} - Jupiter</title>
        <link
          rel="canonical"
          href={'https://jupiter.utdnebula.com/' + event.name}
          key="canonical"
        />
        <meta property="og:url" content={'https://jupiter.utdnebula.com/' + event.name} />
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
                <Link
                  className="text-4xl font-semibold"
                  href={`/directory/${club.id}`}
                >
                  {club.name}
                </Link>
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

import { api } from '@src/utils/api';
import { appRouter } from '@src/server/api/root';
import { createInnerTRPCContext } from '@src/server/api/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from 'next';

export const getServerSideProps: GetServerSideProps<{
  eventId: string;
}> = async (context) => {
  const helper = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
  });

  const eventId = context.params?.eventId;
  if (!eventId) return { notFound: true };

  await helper.event.byId.prefetch({ id: eventId as string });

  return {
    props: {
      eventId: eventId as string,
      trpcState: helper.dehydrate(),
    },
  };
};
