import { z } from 'zod';

const ContactType = z.enum([
  'discord',
  'youtube',
  'twitch',
  'facebook',
  'twitter',
  'instagram',
  'website',
  'email',
  'other',
]);

const IContacts = z.object({
  platform: ContactType,
  url: z.string(),
});

export default IContacts;
export type Contacts = z.infer<typeof IContacts>;
