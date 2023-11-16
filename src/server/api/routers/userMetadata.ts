import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { and, eq, sql } from 'drizzle-orm';
import { userMetadata, userMetadataToClubs } from '@src/server/db/schema';
import { insertUserMetadata } from '@src/server/db/models';

const byIdSchema = z.object({ id: z.string().uuid() });

const updateByIdSchema = z.object({
  updateUser: insertUserMetadata.omit({ id: true }),
  clubs: z.string().array(),
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
      const { updateUser, clubs } = input;
      const { user } = ctx.session;

      await ctx.db
        .update(userMetadata)
        .set(updateUser)
        .where(eq(userMetadata.id, user.id));

      if (clubs.length === 0) {
        await ctx.db
          .delete(userMetadataToClubs)
          .where(and(eq(userMetadataToClubs.userId, user.id)));
        return;
      }

      await ctx.db.delete(userMetadataToClubs).where(
        and(
          eq(userMetadataToClubs.userId, user.id),
          // Invert the condition to delete all clubs that are not in the array
          sql`${userMetadataToClubs.clubId} NOT IN (${clubs})`,
        ),
      );
    }),
});
