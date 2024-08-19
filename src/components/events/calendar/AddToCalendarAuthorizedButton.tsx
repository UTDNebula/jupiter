"use client";
import { type RouterOutputs } from '@src/trpc/shared';
import { CalendarButton } from '@src/icons/Icons';
import { type Session } from 'next-auth';
import { useState } from 'react'




export const AddToCalendarAuthorizedButton = ({
  event, session 
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
  session: Session;
}) => {
    const [status, setStatus] = useState('')

    // This function will check if the user is authenticated and auto add the desired event to their google calendara 
    const createGoogleCalenderEvent = async(session: Session, event : RouterOutputs['event']['findByFilters']['events'][number] ) => {
      // Assume that session is already active since the user was able to reach this button
      if (session.user && session.user.access_token ) {

        const {name, startTime, endTime, description, location} = event
        try {
          const response = await fetch('/api/calendaar/add-event', {
            method:'POST',
            headers: {
              'Content-Type': 'applicaation/json',
              'Authorization': `Bearer ${session.user.access_token}`
            },
            body: JSON.stringify({
              name,
              startTime,
              endTime,
              description,
              location
            })
          })
          
          if (!response.ok) {
            throw new Error("failed to add event to calendar!")
          }

          const data = await response.json();
          setStatus("Event added successfully!")
          console.log("Event added successfully!")
        } catch( e ) {

          setStatus(`Error when trying to add event: ${e}`)
          console.log(`Error when trying to add event: ${e}`)
        }
      } else 
      { // TODO redirect to the regular button sign in or ask if user want to sign in 
        setStatus("User is not authenticated!")
        console.log("User is not authenicated!")
      }
    }


    // TODO onClick error with async function - incompatible types. 
    return (
        <main className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md inset-0 overflow-visible">
        
        <button onClick={createGoogleCalenderEvent(session, event)}>
            <CalendarButton /> auth
        </button>
        </main>
    );
}

export default AddToCalendarAuthorizedButton;
