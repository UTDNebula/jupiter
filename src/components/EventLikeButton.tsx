'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { HeartIcon, HeartOutline } from './Icons';
import { joinEventAction } from '@src/utils/actions';

type buttonProps = {
  eventId: string;
  liked?: boolean;
};
const EventLikeButton = ({ eventId, liked }: buttonProps) => {
  const joinThisAction = joinEventAction.bind(null, eventId, liked ?? false);
  return (
    <form onSubmit={joinThisAction}>
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
