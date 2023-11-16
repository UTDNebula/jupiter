import { eq, ilike, sql } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { club } from '@src/server/db/schema';
const byNameSchema = z.object({
  name: z.string().default(''),
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

const allSchema = z.object({
  tag: z.string().nullish(),
});
const allInfiniteSchema = z.object({
  tag: z.string().nullish(),
  cursor: z.number().nullish(),
});

export const clubRouter = createTRPCRouter({
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
    try {
      let query = ctx.db.select().from(club);
      if (input.tag && typeof input.tag == 'string' && input.tag !== 'All')
        query = query.where(sql`${input.tag} = ANY(tags)`);
      query = query.limit(20);
      const res = await query;
      return res;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
  allInfinite: publicProcedure
    .input(allInfiniteSchema)
    .query(async ({ ctx, input }) => {
      try {
        let query = ctx.db.select().from(club);
        if (input.tag && typeof input.tag == 'string' && input.tag !== 'All')
          query = query.where(sql`${input.tag} = ANY(tags)`);
        query = query.limit(20);
        query = query.offset(input.cursor ?? 0);
        const clubs = await query;
        return { clubs: clubs, cursor: input.cursor ?? 0 + clubs.length };
      } catch (e) {
        console.error(e);
        return { clubs: [], cursor: input.cursor ?? 0 };
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
});
