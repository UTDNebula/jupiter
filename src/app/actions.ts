'use server';
/* eslint-disable @typescript-eslint/require-await */

import { isDate } from 'util/types';
import { redirect } from 'next/navigation';
import { parse } from 'date-fns';
import { z } from 'zod';
import { type eventParamsSchema, order } from '@src/utils/eventFilter';
import EncodeParams from '@src/utils/encodeParams';

const FilterSchema = z.object({
  clubs: z.string().array(),
  order: z.enum(order),
});

export async function eventFilterUpdate(
  queryParams: eventParamsSchema,
  clubs: string[],
  formData: FormData,
) {
  const parsed = FilterSchema.safeParse({
    clubs: clubs,
    order: formData.get('order'),
  });
  if (parsed.success) {
    queryParams.clubs = parsed.data.clubs;
    queryParams.order = parsed.data.order;
    const newQuery = EncodeParams(queryParams);
    redirect(`/events?${newQuery}`);
  }
}
