'use client';

import { useEffect, useState } from "react";

type Props = {
  date: string;
};

const TimeComponent = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect( () => {
    setIsLoading(false);
  }, [])

  const dateString = new Date(props.date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  
  return (isLoading) ? null : <p className="text-sm">{dateString}</p>;
};

export default TimeComponent;
