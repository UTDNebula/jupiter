import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { and, eq, sql } from 'drizzle-orm';

import { insertUserMetadata } from '@src/server/db/models';
import {
  userMetadata,
  userMetadataToClubs,
  users,
} from '@src/server/db/schema/users';

const byIdSchema = z.object({ id: z.string().uuid() });

const updateByIdSchema = z.object({
  updateUser: insertUserMetadata.omit({ id: true }),
  clubs: z.string().array(),
});
const nameSchema = z.object({
  name: z.string().default(''),
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
  deleteById: protectedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.session;
    await ctx.db.delete(users).where(eq(users.id, user.id));
    await ctx.db.delete(userMetadata).where(eq(userMetadata.id, user.id));
  }),
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    const query = await ctx.db.query.userMetadataToEvents.findMany({
      where: (userMetadataToEvents) =>
        eq(userMetadataToEvents.userId, ctx.session.user.id),
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
  searchByName: publicProcedure
    .input(nameSchema)
    .query(async ({ input, ctx }) => {
      const users = ctx.db.query.userMetadata.findMany({
        where: sql`CONCAT(${userMetadata.firstName},' ',${
          userMetadata.lastName
        }) ilike ${'%' + input.name + '%'}`,
      });
      console.log(users.toSQL());
      return await users;
    }),
});
