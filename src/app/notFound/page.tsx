import Head from 'next/head';
import Header from '@src/components/BaseHeader';
import React from 'react';
import { type FC } from 'react';

const NotFound: FC<{ elementType: string }> = ({ elementType }) => {
  return (
    <>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="Not Found - Jupiter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute h-full w-[calc(100%-18rem)] text-center md:ml-72 ">
        <Header />
        <div className="font-bold ">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-slate-200">
            404
          </div>
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-20 text-3xl text-slate-500">
            {elementType} not found
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
	