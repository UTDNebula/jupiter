import { z } from 'zod';
import Contacts from './contacts';
import Event from './event';

const IClub = z.object({
  name: z.string(),
  events: z.array(Event).default([]),
  description: z.string().default('Cool club at UTD!'),
  contacts: Contacts.partial(),
  tags: z.array(z.string()).default([]),
  image: z.string().default('/nebula-logo.png'),
  id: z.string(),
});

export default IClub;
export type Club = z.infer<typeof IClub>;
