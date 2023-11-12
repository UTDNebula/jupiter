'use client';

type Props = {
  date: string;
};

const TimeComponent = (props: Props) => {
  const dateString = new Date(props.date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return <p className=" text-sm mt-2">{dateString}</p>;
};

export default TimeComponent;
