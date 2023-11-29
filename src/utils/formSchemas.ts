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
