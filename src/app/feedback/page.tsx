import React from 'react';
import Header from '@src/components/BaseHeader';
import { type Metadata } from 'next';
import  Form  from '@src/app/feedback/Form';


export const metadata: Metadata = {
  title: 'Feedback - Jupiter',
  description: 'Get connected on campus.',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/feedback',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/feedback',
    description: 'Get connected on campus.',
  },
};


const Feedback = () => {

  return (
    <main className="h-full md:pl-72 ">
      <Header />

      <div className="flex h-full w-full flex-row mb-20 " > 
        <section className='bg-white m-auto justift-center items-center text-center py-6 px-10 shadow-lg rounded-lg mt-3'>
          <Form />
        </section>
      </div>
    </main>
  );
};

export default Feedback;
