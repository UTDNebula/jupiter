import Header from '@src/components/BaseHeader';
import { type Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'Liked - Jupiter',
  description: 'Liked Page',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/liked',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/liked',
    description: 'Liked - Jupiter',
  },
};

const Liked = () => {
  return (
    <main className="h-full md:pl-72">
      <Header />
      <div className="flex w-full place-content-center items-center pt-20">
        <Image src="/nebula-logo.png" alt="" width={300} height={300} />
      </div>
      <div className="h-full">
        <h1 className=" text-black-500 pt-5 text-center text-3xl font-bold">
          The Liked Page is Under Construction!
        </h1>
        <h1 className=" text-black-500 pt-2 text-center text-2xl font-bold">
          Please Come Back Later!
        </h1>
      </div>
    </main>
  );
};

export default Liked;
