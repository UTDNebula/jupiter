import { EventHeader } from '@src/components/BaseHeader';
import { db } from '@src/server/db';
import { events } from '@src/server/db/schema';
import { eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Params = { params: { id: string } };

export default async function EventsPage({ params }: Params) {
  const res = await db.query.events.findFirst({
    where: eq(events.id, params.id),
    with: { club: true },
  });

  if (!res) return <div>Event Not Found.</div>;

  const { club, ...event } = res;

  return (
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
  };
}
