import { z } from 'zod';
export const filters = [
  'Upcoming Events',
  'Last weeks events',
  'Last month events',
  'Date',
  'Date Range',
] as const;
export const order = [
  'soon',
  'later',
  'shortest duration',
  'longest duration',
] as const;
export const eventParamsSchema = z.object({
  filter: z.enum(filters).catch('Upcoming Events'),
  clubs: z
    .string()
    .default('[]')
    .transform((s) => JSON.parse(decodeURIComponent(s)) as string[])
    .pipe(z.string().array().catch([])),
  order: z.enum(order).default('soon'),
  view: z.enum(['list', 'grid']).catch('list'),
  liked: z.boolean().catch(false),
});
