'use client';
//import react
import React from 'react';
import { format } from 'date-fns';

//ensures startTime and endTime are Date types
interface ClientEventTimeProps {
  startTime: Date; // start time of event in UTC
  endTime: Date; // end time of event in UTC
}

const ClientEventTime: React.FC<ClientEventTimeProps> = ({
  startTime,
  endTime,
}) => {
  //convert the startTime from UTC to the users local time with the Date object
  //tolocalestring gives the date and time formatted according to users local time
  const localStartTime = new Date(startTime).toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  //same
  const localEndTime = new Date(endTime).toLocaleString(undefined, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  //resturn span element that dispalys local start and end time
  return (
    <span>
      {localStartTime} - {localEndTime}
    </span>
  );
};
//export it
export default ClientEventTime;
