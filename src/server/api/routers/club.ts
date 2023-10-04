import { eq } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import Fuse from 'fuse.js';
import { selectClub } from '@src/server/db/models';
const byNameSchema = z.object({
  name: z.string().default(''),
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

export const clubRouter = createTRPCRouter({
  byName: publicProcedure.input(byNameSchema).query(async ({ input, ctx }) => {
    const { name } = input;
    const clubs = await ctx.db.query.club.findMany();

    if (name === '') return clubs.map((c) => selectClub.parse(c));

    const fuse = new Fuse(clubs, { keys: ['name', 'description'] });
    const results = fuse.search(name);
    console.log({ results, name, clubs });
    if (results.length === 0) return [];

    const parsed = results.map((r) => selectClub.parse(r.item));
    if (parsed.length < 5) return parsed;
    return parsed.slice(0, 5);
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
  all: publicProcedure.query(async ({ ctx }) => {
    try {
      const query = await ctx.db.query.club.findMany();

      const parsed = query.map((q) => selectClub.parse(q));
      return parsed;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
});
