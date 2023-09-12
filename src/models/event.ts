import { z } from 'zod';

const IEvent = z.object({
  name: z.string(),
  hostClub: z.string(),
  when: z.date(),
});

export default IEvent;
export type Event = z.infer<typeof IEvent>;
