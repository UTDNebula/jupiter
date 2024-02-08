import { z } from 'zod';

// schemas for parsing and transforming query params
// input types are all strings that should then be transformed and piped into a parse
export const eventParamsSchema = z.object({
  filter: z
    .enum(['Upcoming Events', 'Last weeks events', 'Last month events'])
    .default('Upcoming Events'),
  clubs: z
    .string()
    .default('[]')
    .transform((s) => JSON.parse(decodeURIComponent(s)) as string[])
    .pipe(z.string().array().default([])),
  order: z
    .enum(['soon', 'later', 'shortest duration', 'longest duration'])
    .default('soon'),
  view: z.enum(['list', 'grid']).default('list'),
});
