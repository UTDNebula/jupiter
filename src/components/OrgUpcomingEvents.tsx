import { api } from '@src/trpc/server';
import { type FC } from 'react';

const OrgUpcomingEvents: FC<{ club_id: string }> = async ({ club_id }) => {
  const cur_time = new Date();

  const data = await api.event.byClubId.query({
    clubId: club_id,
    currentTime: cur_time,
    sortByDate: true,
  });

  return (
    <div className="w-full rounded-lg bg-slate-100 p-10">
      <h1 className="mt-5 text-2xl font-medium">Upcoming Events</h1>
      <div className="mt-5 flex flex-col items-start  justify-evenly md:flex-row">
        {data && data.length > 0 ? (
          data.map((event) => (
            <div
              key={event.id}
              className=" cursor-pointer rounded-lg bg-blue-500 p-4"
            >
              <div className="font-medium">{event.name}</div>
              <div>- {event.description}</div>
              <div>
                -{' '}
                {`${
                  event.startTime.getMonth() + 1
                }/${event.startTime.getDate()}`}
              </div>
            </div>
          ))
        ) : (
          <div className="font-medium">There are no upcoming events</div>
        )}
      </div>
    </div>
  );
};

export default OrgUpcomingEvents;
