import { z } from 'zod';

const genericPlatformSchema = z.object({
  platform: z.enum([
    'discord',
    'youtube',
    'twitch',
    'facebook',
    'twitter',
    'instagram',
    'website',
    'other',
  ]),
  clubId: z.string().optional(),
  url: z.string().url(),
});

const emailSchema = z.object({
  platform: z.literal('email'),
  url: z.string().email(),
});
const contactSchema = z.discriminatedUnion('platform', [
  genericPlatformSchema,
  emailSchema,
]);

export const createClubSchema = z.object({
  name: z.string().min(3, 'Club name must be at least 3 characters long'),
  description: z.string().min(1, 'Description is required'),
  officers: z
    .object({
      id: z.string().min(1),
      name: z.string(),
      position: z.string().min(1),
      president: z.boolean(),
      locked: z.boolean(),
    })
    .array()
    .min(1),
  contacts: contactSchema.array(),
});
export const editClubContactSchema = z.object({
  contacts: contactSchema.array(),
});

export const editClubSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  description: z.string().min(1),
});
export const editOfficerSchema = z.object({
  officers: z
    .object({
      userId: z.string(),
      name: z.string(),
      locked: z.boolean(),
      title: z.string().min(1),
      position: z.enum(['President', 'Officer']),
    })
    .array(),
});
