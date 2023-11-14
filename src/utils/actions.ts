'use server';
import { getServerAuthSession } from '@src/server/auth';
import { api } from '@src/trpc/server';
import { revalidatePath } from 'next/cache';

export async function joinEventAction(
  eventId: string,
  liked: boolean,
  userId?: string,
) {
  'use server';
  const session = await getServerAuthSession();
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
