import { z } from 'zod';

const emailSchema = z.object({
  platform: z.literal('email'),
  clubId: z.string().optional(),
  url: z.string().email('Must be a valid email'),
});
const discordSchema = z.object({
  platform: z.literal('discord'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/discord\.(gg|com)\/.+/, 'Must be a discord link'),
});

const youtubeSchema = z.object({
  platform: z.literal('youtube'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/youtube\.(com)\/.+/, 'Must be a youtube link'),
});

const twitchSchema = z.object({
  platform: z.literal('twitch'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/twitch\.(tv)\/.+/, 'Must be a twitch link'),
});

const facebookSchema = z.object({
  platform: z.literal('facebook'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/facebook\.(com)\/.+/, 'Must be a facebook link'),
});

const twitterSchema = z.object({
  platform: z.literal('twitter'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/(twitter|x)\.(com)\/.+/, 'Must be a twitter link'),
});
const instagramSchema = z.object({
  platform: z.literal('instagram'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https:\/\/instagram\.(com)\/.+/, 'Must be a instagram link'),
});

const websiteSchema = z.object({
  platform: z.literal('website'),
  clubId: z.string().optional(),
  url: z
    .string()
    .url('Vaid url required')
    .regex(/https?:\/\/.*\.?.+\..+\/.+/, 'Must be a valid website link'),
});

const otherSchema = z.object({
  platform: z.literal('other'),
  clubId: z.string().optional(),
  url: z.string().url('must be a valid url'),
});

export const contactSchema = z.discriminatedUnion('platform', [
  emailSchema,
  discordSchema,
  youtubeSchema,
  twitchSchema,
  facebookSchema,
  twitterSchema,
  instagramSchema,
  websiteSchema,
  otherSchema,
]);
export type contact = z.infer<typeof contactSchema>;
