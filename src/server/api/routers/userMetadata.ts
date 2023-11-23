import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { eq } from 'drizzle-orm';
import { userMetadata, userMetadataToEvents } from '@src/server/db/schema';
import { insertUserMetadata } from '@src/server/db/models';

const byIdSchema = z.object({ id: z.string().uuid() });

const updateByIdSchema = z.object({
  id: z.string().uuid(),
  updatedMetadata: insertUserMetadata.omit({ id: true }),
});

export const userMetadataRouter = createTRPCRouter({
  byId: protectedProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    const userMetadata = await ctx.db.query.userMetadata.findFirst({
      where: (userMetadata) => eq(userMetadata.id, id),
      with: { clubs: true },
    });

    return userMetadata;
  }),
  updateById: protectedProcedure
    .input(updateByIdSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(userMetadata)
        .set(input.updatedMetadata)
        .where(eq(userMetadata.id, input.id));
    }),
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    const query = await ctx.db.query.userMetadataToEvents.findMany({
      where: eq(userMetadataToEvents.userId, ctx.session.user.id),
      with: {
        event: {
          with: {
            club: true,
          },
        },
      },
    });
    return query.map((item) => {
      return { ...item.event, liked: true };
    });
  }),
});
