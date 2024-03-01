'use client';
/* eslint-disable @typescript-eslint/no-misused-promises */
import { CheckIcon, EventsIcon, GroupIcon, HeartIcon, HeartOutline, HistoryIcon, PlusIcon } from '../icons/Icons';
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
        <CheckIcon fill = "fill-slate-800"/>
      ) : (
        <PlusIcon fill = "fill-slate-800"/>
      )}
    </button>
  );
};
export default EventLikeButton;
