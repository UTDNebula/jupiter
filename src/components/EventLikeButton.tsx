'use client';
/* eslint-disable @typescript-eslint/no-floating-promises */
import { HeartIcon, HeartOutline } from './Icons';
import { joinEventAction } from '@src/utils/actions';

type buttonProps = {
  eventId: string;
  liked: boolean;
  userId?: string;
};
const EventLikeButton = ({ eventId, liked, userId }: buttonProps) => {
  return (
    <button
      type="button"
      className="h-10 w-10 rounded-full bg-white p-1.5 shadow-lg"
      onClick={() => {
        joinEventAction(eventId, liked);
      }}
    >
      {liked ? (
        <HeartIcon fill="fill-red-600" />
      ) : (
        <HeartOutline fill="fill-slate-500" />
      )}
    </button>
  );
};
export default EventLikeButton;
