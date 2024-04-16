import { startOfToday, toDate } from 'date-fns';
import { z } from 'zod';
export const order = [
  'soon',
  'later',
  'shortest duration',
  'longest duration',
] as const;
export const eventParamsSchema = z.object({
  date: z
    .string()
    .transform((s) => toDate(Number.parseInt(s)))
    .pipe(z.date().catch(startOfToday())),
  clubs: z
    .string()
    .default('[]')
    .transform((s) => JSON.parse(decodeURIComponent(s)) as string[])
    .pipe(z.string().array().catch([])),
  order: z.enum(order).default('soon'),
  liked: z.boolean().catch(false),
});

export type eventParamsSchema = z.infer<typeof eventParamsSchema>;
