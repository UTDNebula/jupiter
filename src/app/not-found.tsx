import Head from 'next/head';
import NotFound from './liked/page';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Jupiter',
  description: 'Page does not exist.',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/404',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/404',
    description: 'Page does not exist.',
  },
};

const error = () => {
  return (
    <>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="Not Found - Jupiter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotFound elementType="Page" />
    </>
  );
};

export default error;
