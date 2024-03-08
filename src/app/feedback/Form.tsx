"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { feedbackFormSchema } from '@src/utils/formSchemas';
import { api } from '@src/trpc/react';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import nebulaPic from "public/android-chrome-192x192.png"

const Form = () =>{ 

    const { register, handleSubmit} = useForm<z.infer< typeof feedbackFormSchema>>({
        resolver: zodResolver(feedbackFormSchema)
    });

    const createForm = api.form.sendForm.useMutation() 
    
    const submitForm = handleSubmit(( data ) => {
        console.log(data)
        if (!createForm.isLoading) createForm.mutate(data);
    })

    return (
          <form onSubmit={ submitForm }
                className = 'relative  text-slate-700'
          >
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
            <textarea id='rating' 
                      required
                      {...register("rating", {valueAsNumber: true})} 
                      className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md">
            </textarea>
            {/* Add a rating system here */}

            <br></br>
            
            <h3 className="text-md border-t-2 border-slate-200 pt-2 my-4 text-slate-500">
              What do you like about Jupiter?
            </h3>
            <textarea id='likes'
                      required
                      {...register("likes")}
                      className=" overflow-auto w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
            <br></br>

            <h3 className="text-md border-t-2 border-slate-200 pt-2 my-4 w-full text-slate-500">
              What do you dislike about Jupiter?
            </h3>
  
            <textarea id='dislikes' 
                      required
                      {...register("dislikes")}
                      className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>

            <h3 className="text-md border-t-2 border-slate-200 text-slate-500 pt-2 my-4 ">
              What features would you like to see in Jupiter?
            </h3>
            
            <textarea id='features' 
                      required
                      {...register("features")}
                      className="w-4/5 h-15 p-1 text-left  shadow-xl border-gray-500 border-2 rounded-md"></textarea>
            <br></br> 
            <button type="submit" className="mx-auto my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
    )
}

export default Form;