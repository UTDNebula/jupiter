import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import eventData from '../../demoEvents.json';
import orgData from '../../demoOrganizations.json';
import ContactList from '../../components/ContactList';

const EventPage = () => {
  const router = useRouter();
  const eventTitle = router.query.eventTitle as string;
  const event = eventData.find((event) => event.title === eventTitle);
  if (!event) {
    //router.back();
    return null;
  }

  const org = orgData.find((org) => org.name === event.org);
  console.log(event.org)
  if (!org) {
    //router.back();
    return null;
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10 grid gap-36">
        <div className="flex flex-row gap-44">
          <Image src={event.image} alt={event.title} width={300} height={200} />
          <div className="flex flex-col gap-y-4">
            <h1 className="text-3xl">{event.title}</h1>
            <div className="flex flex-col gap-y-3 align-middle">
              <h3>
                <strong className="font-medium">Date:</strong> {event.date}
              </h3>
              <h3>
                <strong className="font-medium">Time:</strong> {event.time}
              </h3>
              <h3>
                <strong className="font-medium">Location:</strong>{' '}
                {event.location}
              </h3>
              <h5>{event.description}</h5>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs">
                SAVE EVENT TO PROFILE
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Club Information</h1>
          <div className="flex flex-row gap-44">
            <div className="md:col-span-2">
              <Image
                src={org.imageLink}
                alt={org.name}
                width={300}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <h1 className="text-3xl">{event.title}</h1>
              <div className="flex flex-col gap-y-3 align-middle">
                <h3>
                  <strong className="font-medium">Category:</strong>
                </h3>
                <h3>
                  <strong className="font-medium">Meeting Times:</strong>
                </h3>
                <h3>
                  <strong className="font-medium">Meeting Location:</strong>
                </h3>
                <h5>{event.description}</h5>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventPage;
