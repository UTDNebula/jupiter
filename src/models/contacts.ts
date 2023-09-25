import { z } from 'zod';

const ContactEnum = z.enum([
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
  platform: ContactEnum,
  url: z.string().min(1),
});

export default IContacts;
export type Contacts = z.infer<typeof IContacts>;
