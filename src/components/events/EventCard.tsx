'use server';
import { format, isSameDay } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { MoreIcon } from '../../icons/Icons';
import { type RouterOutputs } from '@src/trpc/shared';
import EventLikeButton from '../EventLikeButton';
import { getServerAuthSession } from '@src/server/auth';
import dynamic from 'next/dynamic';
import { and, eq } from 'drizzle-orm';
const EventTimeAlert = dynamic(() => import('./EventTimeAlert'), {
  ssr: false,
});
import AddToCalendarButton from './calendar/AddToCalendarButton';
import AddToCalendarAuthorizedButton from './calendar/AddToCalendarAuthorizedButton';
import { api } from '@src/trpc/server';
import { db } from '@src/server/db';

type EventCardProps = {
  event: RouterOutputs['event']['findByFilters']['events'][number];
};

const HorizontalCard = async ({
  event,
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
}) => {
  const session = await getServerAuthSession();
  return (
    <div className="container flex h-40 flex-row overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-[160px] w-1/3 max-w-[225px]">
        <div className="h-[160px]">
          <Image
            fill
            src={'/event_default.jpg'}
            alt="event image"
            className="object-cover object-left"
          />
        </div>
        <div className="absolute inset-0 p-2 text-white">
          <EventTimeAlert event={event} />
        </div>
      </div>
      <div className="flex w-full flex-row px-6 py-5">
        <div className="flex flex-col space-y-2.5">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="whitespace-nowrap text-xs font-bold">
            <Link
              href={`/directory/${event.clubId ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {event.club.name}
            </Link>{' '}
            •<wbr />
            <span className="text-blue-primary">
              {format(event.startTime, 'E, MMM d, p')}
              {isSameDay(event.startTime, event.endTime) ? (
                <> - {format(event.endTime, 'p')}</>
              ) : (
                <> - {format(event.endTime, 'E, MMM d, p')}</>
              )}
            </span>
          </h4>
          <p className="line-clamp-3 overflow-clip text-ellipsis text-xs font-bold">
            {event.description}
          </p>
        </div>
        <div className="ml-auto flex flex-row space-x-4 ">
          {session && (
            <EventLikeButton liked={event.liked} eventId={event.id} />
            
          )}
          { (session && db.query.accounts.findFirst({
            where: (accounts) => 
              and(
                eq(accounts.userId, session.user.id),
                eq(accounts.provider, "google"),
              ) ,
          }) !== undefined ) 
            ?  <AddToCalendarAuthorizedButton event={event} tokens={ await api.account.getToken({ userId: session.user.id, provider:"google"}) } /> 
            :  <AddToCalendarButton event={event} /> } 
          
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
const VerticalCard = async ({
  event,
}: {
  event: RouterOutputs['event']['findByFilters']['events'][number];
}) => {
  const session = await getServerAuthSession();
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
        <div className="mt-auto flex flex-row space-x-4 ">
          <Link
            className=" h-10 w-10 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
            href={`/event/${event.id}`}
            passHref
          >
            <MoreIcon fill="fill-white" />
          </Link>
          <AddToCalendarButton event={event} />

          {session && (
            <EventLikeButton liked={event.liked} eventId={event.id} />
          )}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <div className="hidden lg:group-data-[view=list]:contents">
        <HorizontalCard event={event} />
      </div>
      <div className="contents lg:group-data-[view=list]:hidden">
        <VerticalCard event={event} />
      </div>
    </div>
  );
};
export default EventCard;
