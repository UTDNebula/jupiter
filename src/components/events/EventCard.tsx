import { type SelectEvent } from '@src/server/db/models';
import { api } from '@src/utils/api';
import { DateTime } from 'luxon';
import Image from 'next/image';
import EventTimeAlert from './EventTimeAlert';

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
        <div className="absolute inset-0 z-10 text-white">
          <EventTimeAlert event={event} />
        </div>
      </div>
      <div className="flex flex-row px-6 py-5">
        <div className="flex flex-col">
          <h3 className="font-bold">{event.name}</h3>
          <h4 className="text-cs font-bold">
            {clubQuery.data?.name} •{' '}
            {DateTime.fromJSDate(event.startTime).toFormat('EEE, MMM, t')}-
            {DateTime.fromJSDate(event.endTime).toFormat('t')}
          </h4>
          <p className="text-xs font-bold">{event.description}</p>
        </div>
      </div>
    </div>
  );
};
const VerticalCard = ({ event }: { event: SelectEvent }) => {
  return <div></div>;
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
