import { z } from 'zod';

const IEvent = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  clubId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export default IEvent;
export type Event = z.infer<typeof IEvent>;
