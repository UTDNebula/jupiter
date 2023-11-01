import { selectContact } from '@src/server/db/models';
import { z } from 'zod';

export const createClubSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
  officers: z
    .object({
      name: z.string().min(1),
      position: z.string().min(1),
    })
    .array()
    .min(1),
  contacts: selectContact
    .omit({ clubId: true, url: true })
    .extend({ url: z.string().url() })
    .array(),
});
export const editClubSchema = z.object({
  contacts: selectContact
    .extend({ clubId: z.string().optional(), url: z.string().url() })
    .array(),
});
