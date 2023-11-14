'use server';
import { joinEventAction } from '@src/utils/actions';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { HeartIcon, HeartOutline } from './Icons';

type buttonProps = {
  eventId: string;
  liked: boolean;
};
const EventLikeButton = ({ eventId, liked }: buttonProps) => {
  const joinEvent = joinEventAction.bind(null, eventId, liked);
  return (
    <form action={joinEvent}>
      <button
        type="submit"
        className="h-10 w-10 rounded-full bg-white p-1.5 shadow-lg"
      >
        {liked ? (
          <HeartIcon fill="fill-red-600" />
        ) : (
          <HeartOutline fill="fill-slate-500" />
        )}
      </button>
    </form>
  );
};
export default EventLikeButton;
