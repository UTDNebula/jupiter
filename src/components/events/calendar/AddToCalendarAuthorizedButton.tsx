"use client";
import { type RouterOutputs } from '@src/trpc/shared';
import { CalendarButton } from '@src/icons/Icons';
import { type Session } from 'next-auth';

export const AddToCalendarAuthorizedButton = ({
  event, session 
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
  session: Session;
}) => {



    return (
        <main className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md inset-0 overflow-visible">
    
        <button onClick={createGoogleCalenderEvent}>
            <CalendarButton /> auth
        </button>
        </main>
    );
}

export default AddToCalendarAuthorizedButton;
