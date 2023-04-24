import { z } from 'zod';

const IContacts = z.object({
  discord: z.string(),
  youtube: z.string(),
  twitch: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  website: z.string(),
  email: z.string(),
});

export default IContacts;
export type Contacts = z.infer<typeof IContacts>;
