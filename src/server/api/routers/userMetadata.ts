import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { eq } from 'drizzle-orm';
import { userMetadata } from '@src/server/db/schema';
import { insertUserMetadata } from '@src/server/db/models';

const byIdSchema = z.object({ id: z.string().length(36, 'id must be a UUID') });

const updateByIdSchema = z.object({
  id: z.string().length(36, 'id must be a UUID'),
  updatedMetadata: insertUserMetadata.omit({ id: true }),
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
      await ctx.db
        .update(userMetadata)
        .set(input.updatedMetadata)
        .where(eq(userMetadata.id, input.id));
    }),
});
