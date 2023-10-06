import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { eq } from 'drizzle-orm';
import IUser from '@src/models/userMetadata';
import { userMetadata } from '@src/server/db/schema';

const byIdSchema = z.object({ id: z.string().length(36, 'id must be a UUID') });

const updateByIdSchema = z.object({
  id: z.string().length(36, 'id must be a UUID'),
  updatedMetadata: IUser,
});

export const userMetadataRouter = createTRPCRouter({
  byId: protectedProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    const userMetadata = await ctx.db.query.userMetadata.findFirst({
      where: (userMetadata) => eq(userMetadata.id, id),
      with: { clubs: true },
    });

    console.log(userMetadata);
  }),
  updateById: protectedProcedure
    .input(updateByIdSchema)
    .mutation(async ({ input, ctx }) => {
      console.log('User Meta to update:', input.updatedMetadata);
      await ctx.db
        .update(userMetadata)
        .set(input.updatedMetadata)
        .where(eq(userMetadata.id, input.id));
    }),
});
