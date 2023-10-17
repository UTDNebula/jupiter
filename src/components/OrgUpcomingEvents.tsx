import { api } from "@src/utils/api";
import { type FC } from "react";
import { useState} from "react";

const OrgUpcomingEvents:FC<{club_id : string}> = ({club_id}) => {

    const [cur_time] = useState( new Date() );

    const {data} = api.event.byClubId.useQuery( {clubId: club_id, currentTime: cur_time, sortByDate: true})

    return (
      <div className="w-full rounded-lg bg-slate-100 p-10">
        <h1 className="font-medium text-2xl mt-5">
          Upcoming Events
        </h1>
        <div className="flex flex-col items-start justify-evenly  md:flex-row mt-5">
          
            {( data && data.length > 0) 
            ?
             data.map( (event) => (
                <div key={event.id} className=" bg-blue-500 p-4 rounded-lg cursor-pointer" >
                  <div className="font-medium">{event.name}</div>
                  <div>- {event.description}</div>
                  <div>- {`${event.startTime.getMonth() + 1}/${event.startTime.getDate()}`}</div>
                </div>
            ))
            :
             <div className="font-medium">There are no upcoming events</div>
          }
            
        </div>
      </div>

    )
}


export default OrgUpcomingEvents;