import { api } from "@src/utils/api";
import { type FC } from "react";
import { SelectClub as Club } from "@src/server/db/models";

let cur_time = new Date();

const OrgUpcomingEvents:FC<{club : Club}> = ({club}) => {
  
    const query_events = (api.event.byClubId.useQuery({ clubId: club.id, currentTime: cur_time, sortByDate: true  })).data
    
    return (
      <div className="w-full rounded-lg bg-slate-100 p-10">
        <h1 className="font-medium text-2xl mt-5">
          Upcoming Events
        </h1>
        <div className="flex flex-col items-start justify-evenly  md:flex-row mt-5">
            {query_events?.map( (event) => (
                <div key={event.id} className=" bg-blue-500 p-4 rounded-lg cursor-pointer" >
                  <div className="font-medium">{event.name}</div>
                  <div>- {event.description}</div>
                  <div>- {`${event.startTime.getMonth() + 1}/${event.startTime.getDay()}`}</div>
                </div>
            ))}
            
        </div>
      </div>

    )
}


export default OrgUpcomingEvents;