'use server';
/* eslint-disable @typescript-eslint/require-await */

import { isDate } from 'util/types';
import { order, type eventParamsSchema } from './eventFilter';
import { redirect } from 'next/navigation';
import { parse } from 'date-fns';
import EncodeParams from './encodeParams';
import { z } from 'zod';

export async function eventTimeUpdate(
  queryParams: eventParamsSchema,
  formData: FormData,
) {
  const udate = formData.get('date');
  if (typeof udate !== 'string') throw new Error('uh oh');
  const date = parse(udate, 'PP', new Date());
  console.log(date);
  if (date && isDate(date)) {
    console.log('hello');
    queryParams.date = date;
    const newQuery = EncodeParams(queryParams);
    redirect(`/events?${newQuery}`);
  }
}

const FilterSchema = z.object({
  clubs: z.string().array(),
  order: z.enum(order),
});

export async function eventFilterUpdate(
  queryParams: eventParamsSchema,
  clubs: string[],
  formData: FormData,
) {
  console.log(formData.getAll('clubs'));
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
