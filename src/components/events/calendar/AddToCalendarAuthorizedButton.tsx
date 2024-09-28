"use client";

import { type RouterOutputs } from '@src/trpc/shared';
import { CalendarButton } from '@src/icons/Icons';
import { api } from '@src/trpc/react';


export const AddToCalendarAuthorizedButton = ({
  event, tokens
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
  tokens: {access_token: string, refresh_token: string | null, id_token: string | null};
}) => {


    const {mutate} = api.calendar.addEvent.useMutation({
      onSuccess: () => console.log("Successfully added event!"),
    }) 

    return (
        <main className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md inset-0 overflow-visible">
        <button onClick={ () => mutate({
          eventName: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          description: event.description, 
          location: event.location,
          tokens: tokens,
        })}>
            <CalendarButton /> auth 
        </button>
        </main>
    );
}

export default AddToCalendarAuthorizedButton;
