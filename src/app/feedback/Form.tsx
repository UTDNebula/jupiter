'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { feedbackFormSchema } from '@src/utils/formSchemas';
import { api } from '@src/trpc/react';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormEventHandler } from 'react';
import FormPopUp from '@src/app/feedback/FormPopUp';
import { useState } from 'react';

import nebulaPic from 'public/android-chrome-192x192.png';

const Form = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleRangeChange: FormEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;
    document.getElementById('num')!.textContent = inputValue;
  };

  const { register, handleSubmit } = useForm<
    z.infer<typeof feedbackFormSchema>
  >({
    resolver: zodResolver(feedbackFormSchema),
  });

  const createForm = api.form.sendForm.useMutation();

  const submitForm = handleSubmit((data) => {
    if (!createForm.isPending) createForm.mutate(data);
    handlePopup();
    handleShowForm();
  });

  return (
    <main className="relative">
      <FormPopUp onClose={handlePopup} isOpen={isPopupOpen} />
      <form
        onSubmit={submitForm}
        className={`relative  z-0 text-slate-700 ${
          showForm ? 'block' : 'hidden'
        }`}
      >
        <div className="absolute -top-3 left-0 hidden h-14 w-14 md:block">
          <Image src={nebulaPic} alt="Nebula" fill />
        </div>
        <h1 className=" pb-2 text-4xl font-bold">Feedback</h1>

        <h3 className="text-md border-t-2 border-black py-4 text-slate-500">
          On a scale of 1-10, how would you rate your experience with Jupiter?
        </h3>
        <input
          id="rating"
          type="range"
          min="1"
          max="10"
          onInput={handleRangeChange}
          {...register('rating', { valueAsNumber: true })}
          className="h-15 w-4/5 rounded-md  border-2 text-left"
        />
        <output id="num" className="p-2 font-semibold">
          5
        </output>

        <br></br>

        <h3 className="text-md my-4 border-t-2 border-slate-200 pt-2 text-slate-500">
          What do you like about Jupiter?
        </h3>
        <textarea
          id="likes"
          rows={3}
          required
          {...register('likes')}
          className=" h-15 w-4/5 resize-none overflow-auto rounded-md border-2  border-gray-500 p-1 text-left shadow-xl"
        ></textarea>
        <br></br>

        <h3 className="text-md my-4 w-full border-t-2 border-slate-200 pt-2 text-slate-500">
          What do you dislike about Jupiter?
        </h3>

        <textarea
          id="dislikes"
          rows={3}
          required
          {...register('dislikes')}
          className=" w-4/5 resize-none rounded-md border-2  border-gray-500 p-1 text-left shadow-xl"
        ></textarea>

        <h3 className="text-md my-4 border-t-2 border-slate-200 pt-2 text-slate-500 ">
          What features would you like to see in Jupiter?
        </h3>

        <textarea
          id="features"
          rows={3}
          required
          {...register('features')}
          className="h-15 w-4/5 resize-none rounded-md border-2  border-gray-500 p-1 text-left shadow-xl"
        ></textarea>
        <br></br>
        <button
          type="submit"
          className="mx-auto my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className={`${showForm ? 'hidden' : 'block'}`}>
        The form has been submitted successfully!
      </div>
    </main>
  );
};

export default Form;
