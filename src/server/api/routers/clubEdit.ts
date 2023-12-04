import { db } from '@src/server/db';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { club, contacts, userMetadataToClubs } from '@src/server/db/schema';
import { editClubSchema } from '@src/utils/formSchemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectContact } from '@src/server/db/models';
async function isOfficer(userId: string, clubId: string) {
  const officer = await db.query.userMetadataToClubs.findFirst({
    where: and(
      eq(userMetadataToClubs.userId, userId),
      eq(userMetadataToClubs.clubId, clubId),
    ),
  });
  return officer?.memberType == 'Officer' || 'President';
}
async function isPresident(userId: string, clubId: string) {
  const officer = await db.query.userMetadataToClubs.findFirst({
    where: and(
      eq(userMetadataToClubs.userId, userId),
      eq(userMetadataToClubs.clubId, clubId),
    ),
  });
  return officer?.memberType == 'President';
}
const editContactSchema = z.object({
  clubId: z.string(),
  deleted: selectContact.shape.platform.array(),
  modified: selectContact.array(),
  created: selectContact.omit({ clubId: true }).array(),
});
const editOfficerSchema = z.object({
  clubId: z.string(),
  deleted: z.string().array(),
  modified: z
    .object({
      userId: z.string(),
      title: z.string(),
      position: z.enum(['President', 'Officer']),
    })
    .array(),
  created: z
    .object({
      userId: z.string(),
      title: z.string(),
    })
    .array(),
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
        const prom = ctx.db
          .update(contacts)
          .set({ url: modded.url })
          .where(
            and(
              eq(contacts.clubId, modded.clubId),
              eq(contacts.platform, modded.platform),
            ),
          );
        promises.push(prom);
      }
      await Promise.all(promises);
      if (input.created.length > 0) {
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
      }
    }),
  officers: protectedProcedure
    .input(editOfficerSchema)
    .mutation(async ({ input, ctx }) => {
      if (!(await isOfficer(ctx.session.user.id, input.clubId))) {
        throw new TRPCError({
          message: 'must be an officer to modify this club',
          code: 'UNAUTHORIZED',
        });
      }
      if (input.deleted.length > 0) {
        await ctx.db
          .delete(userMetadataToClubs)
          .where(
            and(
              eq(userMetadataToClubs.clubId, input.clubId),
              inArray(userMetadataToClubs.userId, input.deleted),
            ),
          );
      }
      const promises: Promise<unknown>[] = [];
      for (const modded of input.modified) {
        const prom = ctx.db
          .update(userMetadataToClubs)
          .set({
            title: modded.title,
          })
          .where(
            and(
              eq(userMetadataToClubs.userId, modded.userId),
              eq(userMetadataToClubs.clubId, input.clubId),
            ),
          );
        promises.push(prom);
      }
      await Promise.all(promises);
      if (input.created.length > 0) {
        await ctx.db
          .insert(userMetadataToClubs)
          .values(
            input.created.map((officer) => {
              return {
                userId: officer.userId,
                clubId: input.clubId,
                officerType: 'Officer' as const,
                title: officer.title,
              };
            }),
          )
          .onConflictDoUpdate({
            target: [userMetadataToClubs.userId, userMetadataToClubs.clubId],
            set: { memberType: 'Officer' as const, title: sql`excluded.title` },
            where: eq(userMetadataToClubs.memberType, 'Member'),
          });
      }
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
