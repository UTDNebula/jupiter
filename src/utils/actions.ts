'use server';
import { getServerAuthSession } from '@src/server/auth';
import { db } from '@src/server/db';
import { userMetadataToEvents } from '@src/server/db/schema';
import { api } from '@src/trpc/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function joinEventAction(eventId: string, liked: boolean) {
  'use server';
  const session = await getServerAuthSession();
  console.log(session);
  if (session) {
    if (liked) {
      const userId = session.user.id;
      await db
        .delete(userMetadataToEvents)
        .where(
          and(
            eq(userMetadataToEvents.userId, userId),
            eq(userMetadataToEvents.eventId, eventId),
          ),
        );
    } else {
      const userId = session.user.id;
      await db
        .insert(userMetadataToEvents)
        .values({ userId: userId, eventId: eventId })
        .onConflictDoNothing();
    }
    revalidatePath('/events');
  }
}
//this doesn't work
export async function joinEventActionTrpc(eventId: string, liked: boolean) {
  'use server';
  const session = await getServerAuthSession();
  console.log(session);
  if (session) {
    if (liked) {
      await api.event.joinEvent.mutate({ id: eventId });
    } else {
      await api.event.leaveEvent.mutate({ id: eventId });
    }
  }
  revalidatePath('/events');
}
