"use client";

import { CalendarButton } from '@src/icons/Icons';
import {useState} from 'react';
import CalendarPopUp  from './CalendarPopUp';
import { type RouterOutputs } from '@src/trpc/shared';

export default function AddToCalendarButton( {
  event,
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
})
{

  const [isOpen, setIsOpen] = useState(false);

  const handlePopUp = () => { setIsOpen(!isOpen); }

  return (
    
    <main className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md inset-0 overflow-visible">

      <button onClick={handlePopUp} >
        <CalendarButton />
      </button>
      <CalendarPopUp isOpen={isOpen} onClose={handlePopUp} event={event} />

    </main>
  );
}
