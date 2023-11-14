'use server';
import { api } from '@src/trpc/server';
import { getSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';

export async function joinEventAction(
  eventId: string,
  liked: boolean,
  userId: string,
) {
  'use server';
  const session = await getSession();
  console.log(session);
  if (session) {
    if (liked) {
      await api.event.leaveEvent.mutate({ id: eventId });
    } else {
      await api.event.joinEvent.mutate({ id: eventId });
    }
    revalidatePath('/events');
  }
  return true;
}
