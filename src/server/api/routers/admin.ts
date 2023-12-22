import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { and, eq } from 'drizzle-orm';
import { club } from '@src/server/db/schema/club';
import { userMetadataToClubs } from '@src/server/db/schema/users';

const deleteSchema = z.object({
  id: z.string(),
});

const updateOfficer = z.object({
  officerId: z.string(),
  clubId: z.string(),
  role: z.enum(['President', 'Officer', 'Member']),
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
  updateOfficer: protectedProcedure
    .input(updateOfficer)
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await ctx.db.query.admin.findFirst({
        where: (admin) => eq(admin.userId, ctx.session.user.id),
      });
      if (!isAdmin) throw new Error('Not an admin');

      await ctx.db
        .update(userMetadataToClubs)
        .set({ memberType: input.role })
        .where(
          and(
            eq(userMetadataToClubs.clubId, input.clubId),
            eq(userMetadataToClubs.userId, input.officerId),
          ),
        );
    }),
  addOfficer: protectedProcedure
    .input(updateOfficer)
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await ctx.db.query.admin.findFirst({
        where: (admin) => eq(admin.userId, ctx.session.user.id),
      });
      if (!isAdmin) throw new Error('Not an admin');

      // Make sure the user is not already an officer
      const exists = await ctx.db.query.userMetadataToClubs.findFirst({
        where: (userMetadataToClubs) =>
          and(
            eq(userMetadataToClubs.clubId, input.clubId),
            eq(userMetadataToClubs.userId, input.officerId),
          ),
      });

      if (exists) {
        await ctx.db
          .update(userMetadataToClubs)
          .set({ memberType: input.role })
          .where(
            and(
              eq(userMetadataToClubs.clubId, input.clubId),
              eq(userMetadataToClubs.userId, input.officerId),
            ),
          );
        return;
      }
      await ctx.db.insert(userMetadataToClubs).values({
        clubId: input.clubId,
        userId: input.officerId,
        memberType: input.role,
      });
    }),
});
