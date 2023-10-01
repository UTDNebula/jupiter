import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { eq } from 'drizzle-orm';

const byIdSchema = z.object({ id: z.string().length(36, 'id must be a UUID') });

export const userMetadataRouter = createTRPCRouter({
  byId: publicProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    const userMetadata = await ctx.db.query.userMetadata.findFirst({
      where: (userMetadata) => eq(userMetadata.id, id),
      with: { clubs: true },
    });

    console.log(userMetadata);
  }),
});
