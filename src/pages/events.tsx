import Head from 'next/head';
import { EventHeader } from '../components/Header';
import EventCalendar from '../components/EventCalendar';

const Events = () => {
  return (
    <>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="Events - Jupiter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="md:pl-72">
        <EventHeader />
        <EventCalendar index={1} />
        <EventCalendar index={2} />
      </main>
    </>
  );
};

export default Events;
