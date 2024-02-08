'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { HeartIcon, HeartOutline } from '../icons/Icons';
import { api } from '@src/trpc/react';
import { useRouter } from 'next/navigation';

type buttonProps = {
  eventId: string;
  liked: boolean;
};
const EventLikeButton = ({ eventId, liked }: buttonProps) => {
  const join = api.event.joinEvent.useMutation();
  const leave = api.event.leaveEvent.useMutation();
  const router = useRouter();
  return (
    <button
      type="submit"
      className="h-10 w-10 rounded-full bg-white p-1.5 shadow-lg"
      onClick={() => {
        if (!liked) {
          void join.mutateAsync({ id: eventId }).then(() => {
            router.refresh();
          });
        } else {
          void leave.mutateAsync({ id: eventId }).then(() => {
            router.refresh();
          });
        }
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
