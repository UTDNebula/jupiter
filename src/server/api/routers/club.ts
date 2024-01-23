import { eq, ilike, sql, and, notInArray, inArray } from 'drizzle-orm';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectContact } from '@src/server/db/models';
import { clubEditRouter } from './clubEdit';
import { userMetadataToClubs } from '@src/server/db/schema/users';
import { club } from '@src/server/db/schema/club';
import { contacts } from '@src/server/db/schema/contacts';
const byNameSchema = z.object({
  name: z.string().default(''),
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

const joinLeaveSchema = z.object({
  clubId: z.string().default(''),
});

const allSchema = z.object({
  tag: z.string().nullish(),
  cursor: z.number().min(0).default(0),
  limit: z.number().min(1).max(50).default(10),
  initialCursor: z.number().min(0).default(0),
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
      let query = ctx.db.select().from(club);
      if (userID) {
        const joinedClubs = ctx.db
          .select({ clubId: userMetadataToClubs.clubId })
          .from(userMetadataToClubs)
          .where(eq(userMetadataToClubs.userId, userID));

        query = query.where(notInArray(club.id, joinedClubs));
      }

      if (input.tag && input.tag !== 'All')
        query = query.where(sql`${input.tag} = ANY(tags)`);

      const res = await query
        .orderBy(club.name)
        .limit(input.limit)
        .offset(input.cursor);

      const newOffset = input.cursor + res.length;

      return {
        clubs: res,
        cursor: newOffset,
      };
    } catch (e) {
      console.error(e);
      return {
        clubs: [],
        cursor: 0,
      };
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
    const results = await ctx.db.query.userMetadataToClubs.findMany({
      where: and(
        eq(userMetadataToClubs.userId, ctx.session.user.id),
        inArray(userMetadataToClubs.memberType, ['Officer', 'President']),
      ),
      with: { club: true },
    });
    // type wah = NonNullable<(typeof results)[number]['club']>;
    return results.map((ele) => ele.club);
  }),
  isOfficer: protectedProcedure
    .input(byIdSchema)
    .query(async ({ input, ctx }) => {
      const found = await ctx.db.query.userMetadataToClubs.findFirst({
        where: and(
          eq(userMetadataToClubs.clubId, input.id),
          eq(userMetadataToClubs.userId, ctx.session.user.id),
          inArray(userMetadataToClubs.memberType, ['Officer', 'President']),
        ),
      });
      return !!found;
    }),
  memberType: publicProcedure
    .input(byIdSchema)
    .query(async ({ input, ctx }) => {
      if (!ctx.session) return undefined;
      return (
        await ctx.db.query.userMetadataToClubs.findFirst({
          where: and(
            eq(userMetadataToClubs.clubId, input.id),
            eq(userMetadataToClubs.userId, ctx.session.user.id),
            inArray(userMetadataToClubs.memberType, ['Officer', 'President']),
          ),
        })
      )?.memberType;
    }),
  joinLeave: protectedProcedure
    .input(joinLeaveSchema)
    .mutation(async ({ ctx, input }) => {
      const joinUserId = ctx.session.user.id;
      const { clubId } = input;
      const dataExists = await ctx.db.query.userMetadataToClubs.findFirst({
        where: (userMetadataToClubs) =>
          and(
            eq(userMetadataToClubs.userId, joinUserId),
            eq(userMetadataToClubs.clubId, clubId),
          ),
      });
      if (dataExists && dataExists.memberType == 'Member') {
        await ctx.db
          .delete(userMetadataToClubs)
          .where(
            and(
              eq(userMetadataToClubs.userId, joinUserId),
              eq(userMetadataToClubs.clubId, clubId),
            ),
          );
      } else {
        await ctx.db
          .insert(userMetadataToClubs)
          .values({ userId: joinUserId, clubId });
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

      if (input.contacts.length > 0) {
        await ctx.db.insert(contacts).values(
          input.contacts.map((contact) => {
            return {
              platform: contact.platform,
              url: contact.url,
              clubId: clubId,
            };
          }),
        );
      }

      await ctx.db.insert(userMetadataToClubs).values(
        input.officers.map((officer) => {
          return {
            userId: officer.id,
            clubId: clubId,
            memberType: officer.president
              ? ('President' as const)
              : ('Officer' as const),
            title: officer.position,
          };
        }),
      );
      return clubId;
    }),
  getOfficers: protectedProcedure
    .input(byIdSchema)
    .query(async ({ input, ctx }) => {
      const officers = await ctx.db.query.userMetadataToClubs.findMany({
        where: and(
          eq(userMetadataToClubs.clubId, input.id),
          inArray(userMetadataToClubs.memberType, ['Officer', 'President']),
        ),
        with: { userMetadata: true },
      });
      return officers;
    }),
  getDirectoryInfo: publicProcedure
    .input(byIdSchema)
    .query(async ({ input: { id }, ctx }) => {
      try {
        const byId = await ctx.db.query.club.findFirst({
          where: (club) => eq(club.id, id),
          with: {
            contacts: true,
            userMetadataToClubs: {
              with: {
                userMetadata: { columns: { firstName: true, lastName: true } },
              },
            },
          },
        });
        return byId;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }),
});
