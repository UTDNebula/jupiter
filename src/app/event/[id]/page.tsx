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
  //   <div className="relative">
  //   <div className="h-full w-full">
  //     <Image
  //       src={club.image}
  //       alt="Picture of the club"
  //       width={400}
  //       height={150}
  //       className="rounded-lg object-cover"
  //       priority
  //     />
  //   </div>
  //   <div className="absolute left-0 top-0 h-full w-full">
  //     <div className="flex h-full w-full flex-row   p-8">
  //       <div className="flex h-full flex-col">
  //         <div className="flex flex-row">
  //           {/* {['Software', 'Innovation', 'Other'].map((tag) => (
  //             <p
  //               key={tag}
  //               className="m-2 rounded-full bg-black bg-opacity-50 px-4 py-2 font-semibold text-slate-100"
  //             >
  //               {tag}
  //             </p>
  //           ))} */}
  //         </div>
  //         <h1 className="mt-auto w-fit rounded-full bg-black bg-opacity-50 p-2 text-center text-4xl font-bold text-slate-100">
  //           {club.name}
  //         </h1>
  //       </div>
  //       <div className="ml-auto flex h-min flex-row items-center gap-x-12 self-center">
  //         <button className="rounded-full bg-blue-primary px-8 py-4 text-xs font-extrabold text-white transition-colors hover:bg-blue-700">
  //           Join
  //         </button>
  //         <button
  //           className="rounded-full bg-blue-primary p-2.5 transition-colors hover:bg-blue-700"
  //           type="button"
  //         >
  //           <div className={'h-8 w-8'}>
              
  //           </div>
  //         </button>
         
  //       </div>
  //     </div>
  //   </div>
  // </div>
    <main className="w-full md:pl-72">
      <EventHeader />
      <div className="mb-5 flex flex-col space-y-6 px-7">
        <div className="relative h-full w-full rounded-xl bg-slate-50 p-10 shadow-lg">
          <Image src={club.image} width={100} height={100} alt={club.name} />
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
    alternates: {
      canonical: `https://jupiter.utdnebula.com/event/${found.id}`,
    },
    openGraph: {
      url: `https://jupiter.utdnebula.com/event/${found.id}`,
      description: found.name + ' - Jupiter',
    },
  };
}
