import { type SelectEvent } from '@src/server/db/models';
import { api } from '@src/utils/api';
import { DateTime } from 'luxon';
import Image from 'next/image';
import EventTimeAlert from './EventTimeAlert';
import Link from 'next/link';
import LikeButton from '../LikeButton';
import { HeartIcon, MoreIcon } from '../Icons';

type EventCardProps = {
  view: 'horizontal' | 'vertical';
  event: SelectEvent;
};

const HorizontalCard = ({ event }: { event: SelectEvent }) => {
  const clubQuery = api.club.byId.useQuery({ id: event.clubId });
  return (
    <div className="container flex h-40 flex-row overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative h-[160px] w-[225px]">
        <div className="h-[160px] w-[225px]">
          <Image fill src={'/event_default.jpg'} alt="event image" />
        </div>
        <div className="absolute inset-0 z-10 p-2 text-white">
          <EventTimeAlert event={event} />
        </div>
      </div>
      <div className="flex w-full flex-row px-6 py-5">
        <div className="flex flex-col space-y-2.5">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="text-xs font-bold">
            <Link
              href={`/directory/${clubQuery.data?.id ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {clubQuery.data?.name}
            </Link>{' '}
            •{' '}
            <span className="text-blue-primary">
              {DateTime.fromJSDate(event.startTime).hasSame(
                DateTime.fromJSDate(event.endTime),
                'day',
              ) ? (
                <>
                  {DateTime.fromJSDate(event.startTime).toFormat(
                    'ccc, LLL d, t',
                  )}
                  -{DateTime.fromJSDate(event.endTime).toFormat('t')}
                </>
              ) : (
                <>
                  {DateTime.fromJSDate(event.startTime).toFormat(
                    'ccc, LLL d, t',
                  )}{' '}
                  -{' '}
                  {DateTime.fromJSDate(event.endTime).toFormat('ccc, LLL d, t')}
                </>
              )}
            </span>
          </h4>
          <p className="text-xs font-bold">{event.description}</p>
        </div>
        <div className="ml-auto flex flex-row space-x-4">
          <div className="h-7.5 w-7.5 rounded-full bg-white p-1.5 shadow-lg">
            <HeartIcon />
          </div>
          <div className=" h-7.5 w-7.5 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800">
            <MoreIcon fill="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
const VerticalCard = ({ event }: { event: SelectEvent }) => {
  const clubQuery = api.club.byId.useQuery({ id: event.clubId });
  return (
    <div className="container flex h-96 w-96 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative">
        <div className="h-40 w-96">
          <Image
            src={'/event_default.jpg'}
            alt="event image"
            fill
            objectFit="cover"
          />
          <div className="absolute inset-0 z-10 p-2">
            <EventTimeAlert event={event} />
          </div>
        </div>
      </div>
      <div className="space-y-6 p-5">
        <div className="space-y-2.5">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="text-xs font-bold">
            <Link
              href={`/directory/${clubQuery.data?.id ?? ''}`}
              className="hover:text-blue-primary"
              scroll
            >
              {clubQuery.data?.name}
            </Link>{' '}
            •{' '}
            <span className="text-blue-primary">
              {DateTime.fromJSDate(event.startTime).hasSame(
                DateTime.fromJSDate(event.endTime),
                'day',
              ) ? (
                <>
                  {DateTime.fromJSDate(event.startTime).toFormat(
                    'ccc, LLL d, t',
                  )}
                  -{DateTime.fromJSDate(event.endTime).toFormat('t')}
                </>
              ) : (
                <>
                  {DateTime.fromJSDate(event.startTime).toFormat(
                    'ccc, LLL d, t',
                  )}{' '}
                  -{' '}
                  {DateTime.fromJSDate(event.endTime).toFormat('ccc, LLL d, t')}
                </>
              )}
            </span>
          </h4>
          <p className="text-xs font-bold">{event.description}</p>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="h-7.5 w-7.5 rounded-full bg-white p-1.5 shadow-lg">
            <HeartIcon />
          </div>
          <div className=" h-7.5 w-7.5 rounded-full bg-blue-primary p-1.5 shadow-lg transition-colors hover:bg-blue-700 active:bg-blue-800">
            <MoreIcon fill="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
const EventCard = ({ view, event }: EventCardProps) => {
  switch (view) {
    case 'horizontal':
      return <HorizontalCard event={event} />;
    case 'vertical':
      return <VerticalCard event={event} />;
  }
};
export default EventCard;
