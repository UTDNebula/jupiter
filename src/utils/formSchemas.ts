import { selectContact } from '@src/server/db/models';
import { z } from 'zod';

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
  contacts: selectContact
    .omit({ clubId: true, url: true })
    .extend({ url: z.string().url() })
    .array(),
});
export const editClubContactSchema = z.object({
  contacts: selectContact
    .extend({ clubId: z.string().optional(), url: z.string().url() })
    .array(),
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

export const feedbackFormSchema = z.object({
  rating: z.number().min(1).max(5),
  likes: z.string().default(''),
  dislikes: z.string().default(''),
  features: z.string().default(''),
  submit_on: z.date().default(new Date()),
})