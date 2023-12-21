import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { eq } from 'drizzle-orm';
import { club } from '@src/server/db/schema/club';

const deleteSchema = z.object({
  id: z.string(),
});

export const adminRouter = createTRPCRouter({
  allOrgs: protectedProcedure.query(async ({ ctx }) => {
    const isAdmin = await ctx.db.query.admin.findFirst({
      where: (admin) => eq(admin.userId, ctx.session.user.id),
    });
    if (!isAdmin) throw new Error('Not an admin');
    const orgs = await ctx.db.query.club.findMany({
      columns: {
        id: true,
        name: true,
        tags: true,
      },
    });
    return orgs;
  }),
  deleteOrg: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await ctx.db.query.admin.findFirst({
        where: (admin) => eq(admin.userId, ctx.session.user.id),
      });
      if (!isAdmin) throw new Error('Not an admin');

      await ctx.db.delete(club).where(eq(club.id, input.id));
    }),
});
