import { eq, ilike, sql, and, notInArray } from 'drizzle-orm';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { club, contacts, userMetadataToClubs } from '@src/server/db/schema';
import { officerData } from '@src/server/db/schema';
import { selectContact } from '@src/server/db/models';
import { clubEditRouter } from './clubEdit';
const byNameSchema = z.object({
  name: z.string().default(''),
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

const joinLeaveSchema = z.object({
  clubid: z.string().default(''),
});

const allSchema = z.object({
  tag: z.string().nullish(),
});
const createClubSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(1),
  officers: z
    .object({
      id: z.string().min(1),
      position: z.string().min(1),
      president: z.boolean(),
    })
    .array()
    .min(1),
  contacts: selectContact
    .omit({ clubId: true, url: true })
    .extend({ url: z.string().url() })
    .array(),
});
export const clubRouter = createTRPCRouter({
  edit: clubEditRouter,
  byName: publicProcedure.input(byNameSchema).query(async ({ input, ctx }) => {
    const { name } = input;
    const clubs = await ctx.db.query.club.findMany({
      where: (club) => ilike(club.name, `%${name}%`),
    });

    if (name === '') return clubs;

    return clubs.slice(0, 5);
  }),
  byId: publicProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;
    try {
      const byId = await ctx.db.query.club.findFirst({
        where: (club) => eq(club.id, id),
        with: { contacts: true },
      });

      return byId;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }),
  all: publicProcedure.input(allSchema).query(async ({ ctx, input }) => {
    const userID = ctx.session?.user.id;
    try {
      let query;
      if (userID) {
        const joinedClubs = ctx.db
          .select({ clubid: userMetadataToClubs.clubId })
          .from(userMetadataToClubs)
          .where(eq(userMetadataToClubs.userId, userID));
        query = ctx.db
          .select()
          .from(club)
          .where(notInArray(club.id, joinedClubs));
      } else {
        query = ctx.db.select().from(club);
      }
      if (input.tag && typeof input.tag == 'string' && input.tag !== 'All') {
        query = query.where(sql`${input.tag} = ANY(tags)`);
      }
      query = query.orderBy(sql`RANDOM()`).limit(20);
      const res = await query;
      return res;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
  distinctTags: publicProcedure.query(async ({ ctx }) => {
    try {
      const tags = await ctx.db.selectDistinct({ tags: club.tags }).from(club);
      const tagSet = new Set<string>(['All']);
      tags.forEach((club) => {
        club.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      });
      return Array.from(tagSet);
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
  getOfficerClubs: protectedProcedure.query(async ({ ctx }) => {
    const results = await ctx.db.query.officerData.findMany({
      where: eq(officerData.userId, ctx.session.user.id),
      with: { club: true },
    });
    type wah = NonNullable<(typeof results)[number]['club']>;
    return results.map((ele) => ele.club).filter((x): x is wah => x !== null);
  }),
  isOfficer: protectedProcedure
    .input(byIdSchema)
    .query(async ({ input, ctx }) => {
      return !!(await ctx.db.query.officerData.findFirst({
        where: and(
          eq(officerData.clubId, input.id),
          eq(officerData.userId, ctx.session.user.id),
        ),
      }));
    }),
  joinLeave: protectedProcedure
    .input(joinLeaveSchema)
    .mutation(async ({ ctx, input }) => {
      const joinuserID = ctx.session.user.id;
      const { clubid } = input;
      const dataExists = await ctx.db.query.userMetadataToClubs.findFirst({
        where: (userMetadataToClubs) =>
          and(
            eq(userMetadataToClubs.userId, joinuserID),
            eq(userMetadataToClubs.clubId, clubid),
          ),
      });
      if (dataExists) {
        await ctx.db
          .delete(userMetadataToClubs)
          .where(
            and(
              eq(userMetadataToClubs.userId, joinuserID),
              eq(userMetadataToClubs.clubId, clubid),
            ),
          );
      } else {
        await ctx.db
          .insert(userMetadataToClubs)
          .values({ userId: joinuserID, clubId: clubid });
      }
      return dataExists;
    }),
  create: protectedProcedure
    .input(createClubSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(club)
        .values({
          name: input.name,
          description: input.description,
        })
        .returning({ id: club.id });
      const clubId = res[0]!.id;
      await ctx.db.insert(contacts).values(
        input.contacts.map((contact) => {
          return {
            platform: contact.platform,
            url: contact.url,
            clubId: clubId,
          };
        }),
      );
      await ctx.db.insert(officerData).values(
        input.officers.map((officer) => {
          return {
            userId: officer.id,
            clubId: clubId,
            officerType: officer.president
              ? ('President' as const)
              : ('Officer' as const),
            title: officer.position,
          };
        }),
      );
      return clubId;
    }),
});
