import { format, isSameDay } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { MoreIcon } from '@src/icons/Icons';
import { type RouterOutputs } from '@src/trpc/shared';
import EventLikeButton from './EventLikeButton';
import { getServerAuthSession } from '@src/server/auth';
import EventTimeAlert from './EventTimeAlert';

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
    <div className="flex h-44 w-full flex-row overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
      <div className="relative h-full w-1/3 max-w-[225px] overflow-hidden">
        <Image
          fill
          src={'/event_default.jpg'}
          alt="event image"
          className="object-cover"
          sizes="(max-width: 225px) 100vw, 225px"
        />
        <div className="absolute inset-0 p-3">
          <EventTimeAlert event={event} />
        </div>
      </div>
      <div className="flex w-full flex-row gap-4 px-6 py-5">
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-bold leading-tight">{event.name}</h3>
          <h4 className="flex flex-wrap items-center gap-x-2 text-sm font-medium">
            <Link
              href={`/directory/${event.clubId ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {event.club.name}
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-blue-primary">
              {format(event.startTime, 'E, MMM d, p')}
              {isSameDay(event.startTime, event.endTime) ? (
                <> - {format(event.endTime, 'p')}</>
              ) : (
                <> - {format(event.endTime, 'E, MMM d, p')}</>
              )}
            </span>
          </h4>
          <p className="line-clamp-2 text-sm text-gray-600">
            {event.description}
          </p>
        </div>
        <div className="ml-auto flex flex-row items-start gap-3">
          {session && (
            <EventLikeButton liked={event.liked} eventId={event.id} />
          )}
          <Link
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-primary shadow-md transition-colors hover:bg-blue-700 active:bg-blue-800"
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
        <div className="mt-auto flex flex-row space-x-4">
          <Link
            className=" h-10 w-10 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800"
            href={`/event/${event.id}`}
            passHref
          >
            <MoreIcon fill="fill-white" />
          </Link>
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
    <div className="w-full">
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
