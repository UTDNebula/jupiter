import { EventHeader } from '@src/components/BaseHeader';
import { db } from '@src/server/db';
import { events } from '@src/server/db/schema';
import { eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import { HeartIcon } from '@src/components/Icons';
import TimeComponent from './TimeComponent';
import wave from "public/images/Wave.jpg"
import Image from 'next/image';

type Params = { params: { id: string } };

export default async function EventsPage({ params }: Params) {
  const res = await db.query.events.findFirst({
    where: eq(events.id, params.id),
    with: { club: true },
  });

  if (!res) return <div>Event Not Found.</div>;

  const { club, ...event } = res;

  const clubTags = ['Software', 'Innovation', 'Other']

  const clubDescription = ['Club', 'President', 'Location', 'Multi-Day']
  const clubDetails = [club.name, 'John Doe', 'ESCW 1.232', 'No']


  return (
    
    <main className="w-full md:pl-72 text-white">
      <EventHeader />

      <section className="mb-5 flex flex-col space-y-6 px-7">
        <div className="relative h-full w-full rounded-xl p-10 shadow-lg flex justify-between bg-[url('/images/Wave.jpg')] bg-cover  ">
          <section>
            <div className="flex ">
              {clubTags.map( (tag) => (
                <p
                  key={tag}
                  className=" mr-5 pt-4 pb-12 font-semibold "
                >
                  {tag}
                </p>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {event.name}
            </h1>
            <TimeComponent date={event.startTime.toLocaleString()} />
          </section>
          <section className="float-right my-auto flex">
            <button
                className="rounded-full bg-blue-primary p-2.5 transition-colors hover:bg-blue-700 mr-12"
                type="button"
            >
              <div className='h-8 w-8 '>
                  <HeartIcon fill="fill-white" />
              </div>
            </button>
            <button className="rounded-full bg-blue-primary px-8 py-4 text-xs font-extrabold text-white transition-colors hover:bg-blue-700 mr-8">
              Register
            </button>
          </section>
        </div>
      </section>

      <section className="mb-5 flex flex-col space-y-6 px-7 text-black">
        <div className="relative h-full w-full rounded-xl p-10 shadow-lg flex justify-between ">
          
          <div className="flex ">
              <div className="h-full w-3/5">
                <div className='relative h-32 w-full rounded-b-sm overflow-hidden mx-auto '>
                  <Image src={wave} alt="wave" layout="fill" objectFit='cover' />
                </div>

                <div>
                  <h1 className=" mt-10 text-sm text-gray-700 font-semibold">
                    Description
                  </h1>
                  
                  <div >
                    {clubDescription.map( (details, index) => (
                      <div 
                       key={details}
                       className="flex text-sm justify-between my-5 text-slate-700"
                      >
                        <p className="mr-5">
                          {details}
                        </p>
                        <p className="font-semibold text-right">
                          {clubDetails[index]}
                        </p>
                      </div>
                    ))
                    }
                  </div>
                </div>
              </div>

              <div>

              </div>

              <div>

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
