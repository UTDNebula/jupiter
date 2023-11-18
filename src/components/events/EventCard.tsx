'use client';
import { type SelectClub, type SelectEvent } from '@src/server/db/models';
import { format, isSameDay } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { HeartIcon, HeartOutline, MoreIcon } from '../Icons';
import EventTimeAlert from './EventTimeAlert';

type EventCardProps = {
  view: 'horizontal' | 'vertical';
  event: SelectEvent & { club: SelectClub };
};

const HorizontalCard = ({
  event,
  liked,
  setLiked,
}: {
  event: SelectEvent & { club: SelectClub };
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="container flex h-40 flex-row overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-[160px] w-[225px]">
        <div className="h-[160px] w-[225px]">
          <Image fill src={'/event_default.jpg'} alt="event image" />
        </div>
        <div className="absolute inset-0 p-2 text-white">
          <EventTimeAlert event={event} />
        </div>
      </div>
      <div className="flex w-full flex-row px-6 py-5">
        <div className="flex flex-col space-y-2.5">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="text-xs font-bold">
            <Link
              href={`/directory/${event.clubId ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {event.club.name}
            </Link>{' '}
            •{' '}
            <span className="text-blue-primary">
              {format(event.startTime, 'E, MMM d, p')}
              {isSameDay(event.startTime, event.endTime) ? (
                <> - {format(event.endTime, 'p')}</>
              ) : (
                <> - {format(event.endTime, 'E, MMM d, p')}</>
              )}
            </span>
          </h4>
          <p className="text-xs font-bold">{event.description}</p>
        </div>
        <div className="ml-auto flex flex-row space-x-4">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white p-1.5 shadow-lg"
            onClick={() => {
              setLiked(!liked);
            }}
          >
            {liked ? (
              <HeartIcon fill="fill-red-600" />
            ) : (
              <HeartOutline fill="fill-slate-500" />
            )}
          </button>
          <Link
            className=" h-10 w-10 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
            href={`/event/${event.id}`}
            passHref
          >
            <MoreIcon fill="fill-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
const VerticalCard = ({
  event,
  liked,
  setLiked,
}: {
  event: SelectEvent & { club: SelectClub };
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="container flex h-96 w-64 flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative">
        <div className="h-40 w-96">
          <Image
            src={'/event_default.jpg'}
            alt="event image"
            fill
            objectFit="cover"
          />
          <div className="absolute inset-0 p-2">
            <EventTimeAlert event={event} />
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col p-5">
        <div className="space-y-2.5">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="text-xs font-bold">
            <Link
              href={`/directory/${event.clubId ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {event.club.name}
            </Link>
            <div>
              <span className="text-blue-primary">
                {format(event.startTime, 'E, MMM d, p')}
                {isSameDay(event.startTime, event.endTime) ? (
                  <> - {format(event.endTime, 'p')}</>
                ) : (
                  <>
                    {' '}
                    - <br />
                    {format(event.endTime, 'E, MMM d, p')}
                  </>
                )}
              </span>
            </div>
          </h4>
        </div>
        <div className="mt-auto flex flex-row space-x-4">
          <Link
            className=" h-10 w-10 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
            href={`/event/${event.id}`}
            passHref
          >
            <MoreIcon fill="fill-white" />
          </Link>
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white p-1.5 shadow-lg"
            onClick={() => {
              setLiked(!liked);
            }}
          >
            {liked ? (
              <HeartIcon fill="fill-red-600" />
            ) : (
              <HeartOutline fill="fill-slate-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
const EventCard = ({ view, event }: EventCardProps) => {
  const [liked, setLiked] = useState(false);
  switch (view) {
    case 'horizontal':
      return <HorizontalCard event={event} liked={liked} setLiked={setLiked} />;
    case 'vertical':
      return <VerticalCard event={event} liked={liked} setLiked={setLiked} />;
  }
};
export default EventCard;
