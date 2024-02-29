
import React from 'react';
import Header from '@src/components/BaseHeader';
import { type Metadata } from 'next';
import Image from 'next/image';
import { handleForm } from '@src/app/feedback/formAction';
import nebulaPic from "public/android-chrome-192x192.png"

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

/*
-- Create zod to validate the form data 

*/
const Feedback = () => {
  
  // function handleSubmit( e : React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault() 
  //   console.log("Form submitted")
  //   // Add a POST request to send the feedback to the server -- Add later 

  // }


  return (
    <main className="h-full md:pl-72 ">
      <Header />

      <div className="flex h-full w-full flex-row mb-20" > 
        
        <section className='bg-white m-auto justift-center items-center text-center py-6 px-10 shadow-lg rounded-lg mt-3'>
          <form action={ handleForm } className='relative  text-slate-700'>
            <div className="w-14 h-14 absolute -top-3 left-0 ">
              <Image 
                src={nebulaPic}
                alt="Nebula"
                fill 
              />
            </div>
            <h1 className=" text-4xl font-bold pb-2" >Feedback</h1> 
            
            <h3 className="text-md border-t-2 border-black py-4 text-slate-500">
              On a scale of 1-5, how would you rate your experience with Jupiter?
            </h3>
            <textarea className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
            {/* Add a rating system here */}

            <br></br>
            
            <h3 className="text-md border-t-2 border-slate-200 pt-2 my-4 text-slate-500">
              What do you like about Jupiter?
            </h3>
            <textarea className=" overflow-auto w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
            <br></br>

            <h3 className="text-md border-t-2 border-slate-200 pt-2 my-4 w-full text-slate-500">
              What do you dislike about Jupiter?
            </h3>
  
            <textarea className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
  
            <h3 className="text-md border-t-2 border-slate-200 text-slate-500 pt-2 my-4 ">
              What features would you like to see in Jupiter?
            </h3>
            
            <textarea className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
            <br></br> 
            <button type="submit" className="mx-auto my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </section>

      </div>
    </main>
  );
};

export default Feedback;
