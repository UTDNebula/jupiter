import { EventHeader } from '@src/components/BaseHeader';
import { db } from '@src/server/db';
import { events } from '@src/server/db/schema';
import { eq } from 'drizzle-orm';
import { type Metadata } from 'next';

import TimeComponent from './TimeComponent';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import LikeButton from '@src/components/LikeButton';
import Link from 'next/link';
import { getServerAuthSession } from '@src/server/auth';

type Params = { params: { id: string } };

export default async function EventsPage({ params }: Params) {
  const session = await getServerAuthSession();
  const res = await db.query.events.findFirst({
    where: eq(events.id, params.id),
    with: { club: true },
  });

  if (!res) return <div>Event Not Found.</div>;

  const { club, ...event } = res;

  const clubDescription = ['Club', 'President', 'Location', 'Multi-Day'];
  const clubDetails = [club.name, 'John Doe', event.location, 'No'];

  const truncatedDescription =
    club.description.length > 350
      ? club.description.slice(0, 350) + '...'
      : club.description;

  return (
    <main className="w-full md:pl-72">
      <EventHeader />

      <section className="mb-5 flex flex-col space-y-6 px-7">
        <div className="relative flex h-full w-full justify-between rounded-xl bg-[url('/images/wideWave.jpg')] bg-cover p-10 shadow-lg  ">
          <section className="text-white">
            <div className="flex ">
              {club.tags.map((tag) => (
                <p key={tag} className=" mr-5 pb-12 pt-4 font-semibold ">
                  {tag}
                </p>
              ))}
            </div>
            <h1 className="mb-4 text-4xl font-bold">{event.name}</h1>
            <TimeComponent date={event.startTime.toISOString()} />
          </section>
          <section className="float-right my-auto flex">
            {session && (
                <button
                  className="mr-12 rounded-full bg-blue-400 p-2.5 transition-colors hover:bg-blue-700"
                  type="button"
                >
                  <LikeButton />
                </button>
              ) && (
                <button className="mr-8 rounded-full bg-blue-primary px-8 py-4 text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
                  Register
                </button>
              )}
          </section>
        </div>
      </section>

      <section className="mb-5 flex flex-col space-y-6 px-7 text-black">
        <div className="relative flex h-full w-full rounded-xl p-10 shadow-lg ">
          <div className="m-4  flex w-max">
            <div className="h-full max-w-sm lg:min-w-fit">
              <div className="relative mx-auto h-40 w-full overflow-hidden rounded-b-md ">
                <Image
                  src={club.image}
                  alt={club.name + ' logo'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className=" mt-10 text-sm font-semibold text-gray-700">
                  Description
                </h1>

                <div>
                  {clubDescription.map((details, index) => (
                    <div
                      key={details}
                      className="my-5 flex justify-between text-xs text-slate-700"
                    >
                      <p className="mr-5">{details}</p>
                      <p className="text-right font-semibold ">
                        {clubDetails[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-12 flex-grow text-sm">
              <div>
                {truncatedDescription.split('\n').map((str, i) => (
                  <p className="text-slate-700" key={i}>
                    {str}
                  </p>
                ))}
                <Link
                  className="text-slate-500 underline transition-colors hover:text-slate-700"
                  href={`/directory/${club.id}`}
                >
                  see more
                </Link>
              </div>
              {event.description.split('\n').map((desc, i) => (
                <p className="mt-4 text-gray-500" key={i}>
                  {desc}
                </p>
              ))}
            </div>

            <div className="flex flex-col ">
              <CountdownTimer startTime={event.startTime} />

              <Link
                href={`/directory/${club.id}`}
                className="mr-8 mt-auto block w-36 break-normal rounded-full border-2 border-blue-primary py-4 text-center text-xs font-extrabold text-blue-primary transition-colors hover:bg-blue-700 hover:text-white"
              >
                View Club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const found = await db.query.events.findFirst({
    where: eq(events.id, id),
    with: { club: true },
  });
  if (!found)
    return {
      title: 'Event not found',
      description: 'Event not found',
    };

  return {
    title: `${found.name} - Jupiter`,
    description: found.description.slice(0, 30) + '...',
    alternates: {
      canonical: `https://jupiter.utdnebula.com/event/${found.id}`,
    },
    openGraph: {
      url: `https://jupiter.utdnebula.com/event/${found.id}`,
      description: found.name + ' - Jupiter',
    },
  };
}
