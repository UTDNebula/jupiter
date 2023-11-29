import { db } from '@src/server/db';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { and, eq, inArray } from 'drizzle-orm';
import { club, contacts, officerData } from '@src/server/db/schema';
import { editClubSchema } from '@src/utils/formSchemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectContact } from '@src/server/db/models';
async function isOfficer(userId: string, clubId: string) {
  const officer = await db.query.officerData.findFirst({
    where: and(eq(officerData.userId, userId), eq(officerData.clubId, clubId)),
  });
  return !!officer;
}
async function isPresident(userId: string, clubId: string) {
  const officer = await db.query.officerData.findFirst({
    where: and(eq(officerData.userId, userId), eq(officerData.clubId, clubId)),
  });
  return officer?.officerType == 'President';
}
const editContactSchema = z.object({
  clubId: z.string(),
  deleted: selectContact.shape.platform.array(),
  modified: selectContact.array(),
  created: selectContact.omit({ clubId: true }).array(),
});
const deleteSchema = z.object({ clubId: z.string() });

export const clubEditRouter = createTRPCRouter({
  data: protectedProcedure
    .input(editClubSchema)
    .mutation(async ({ input, ctx }) => {
      if (!(await isOfficer(ctx.session.user.id, input.id))) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const updatedClub = await ctx.db
        .update(club)
        .set({ name: input.name, description: input.description })
        .where(eq(club.id, input.id))
        .returning();
      return updatedClub;
    }),
  contacts: protectedProcedure
    .input(editContactSchema)
    .mutation(async ({ input, ctx }) => {
      if (!(await isOfficer(ctx.session.user.id, input.clubId))) {
        throw new TRPCError({
          message: 'must be an officer to modify this club',
          code: 'UNAUTHORIZED',
        });
      }
      if (input.deleted.length > 0) {
        await ctx.db
          .delete(contacts)
          .where(
            and(
              eq(contacts.clubId, input.clubId),
              inArray(contacts.platform, input.deleted),
            ),
          );
      }
      const promises: Promise<unknown>[] = [];
      for (const modded of input.modified) {
        const prom = ctx.db.update(contacts).set(modded);
        promises.push(prom);
      }
      await Promise.all(promises);
      await ctx.db
        .insert(contacts)
        .values(
          input.created.map((contact) => {
            return {
              clubId: input.clubId,
              platform: contact.platform,
              url: contact.url,
            };
          }),
        )
        .onConflictDoNothing();
    }),
  delete: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ input, ctx }) => {
      if (!(await isPresident(ctx.session.user.id, input.clubId))) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      await ctx.db.delete(club).where(eq(club.id, input.clubId));
    }),
});
