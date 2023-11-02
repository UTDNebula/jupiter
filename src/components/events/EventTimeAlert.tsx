import { type SelectEvent } from '@src/server/db/models';

type EventTimeAlertProps = {
  event: SelectEvent;
};
const EventTimeAlert = ({ event }: EventTimeAlertProps) => {
  if (event.startTime < new Date()) {
    if (event.endTime < new Date()) {
      return <div>over :(</div>;
    } else {
      return <div>NOW</div>;
    }
  }
  return <div>soon</div>;
};
export default EventTimeAlert;
