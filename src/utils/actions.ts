'use server';

import { isDate } from 'util/types';
import { type eventParamsSchema } from './eventFilter';
import { redirect } from 'next/navigation';
import { parse } from 'date-fns';
import EncodeParams from './encodeParams';

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
