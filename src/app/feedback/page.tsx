
import React from 'react';
import Header from '@src/components/BaseHeader';
import { type Metadata } from 'next';
import Image from 'next/image';
import jupiterPic from "assets/media/icons/Jupiter.png"

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
  
  function handleSubmit( e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault() 
    console.log("Form submitted")
    // Add a POST request to send the feedback to the server -- Add later 

  }


  return (
    <main className="h-full md:pl-72 ">
      <Header />

      <div className="flex h-full w-full flex-row " > 
        
        <section className="h-[20vh] w-[20vw] first-line:text-white rounded-md  bg-green-500 relative m-auto hidden xl:flex">
          <Image
            src={jupiterPic}
            alt="Jupiter"
            fill
          />
        </section>

        <section className='bg-white m-auto justift-center items-center text-center p-6 shadow-lg rounded-lg'>
          <form >
            <h1 className=" text-4xl font-bold " >Feedback</h1> 
            
            <h3 className="text-md border-t-2 py-4">
              On a scale of 1-5, how would you rate your experience with Jupiter?
            </h3>
            <input type="number" min="1" max="5" step="1" className=" shadow-xl border-gray-500 border-2 rounded-md" />
            {/* Add a rating system here */}

            <br></br>

            <h3 className="text-md border-t-2 py- my-4">
              What do you like about Jupiter?
            </h3>
            <input type="text w-full " className=" shadow-xl border-gray-500 border-2 rounded-md"/>
            <br></br>

            <h3 className="text-md border-t-2 py-4 my-4 w-full">
              What do you dislike about Jupiter?
            </h3>
  
            <input type="text w-full" className=" shadow-xl border-gray-500 border-2 rounded-md"/>
  
            <h3 className="text-md border-t-2 py-4 my-4 ">
              What features would you like to see in Jupiter?
            </h3>
            
            <input type='text w-full' className=" shadow-xl border-gray-500 border-2 rounded-md"></input>
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
