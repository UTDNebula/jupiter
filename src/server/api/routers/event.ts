import { eq, gte, lte, and } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectEvent } from '@src/server/db/models';

const byClubIdSchema = z.object({
  clubId: z.string().default(''),
  currentTime: z.optional(z.date()),
  sortByDate: z.boolean().default(false),
});

const byDateRangeSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
});
const fromDateRangeSchema = z.object({
  limit: z.number().min(1).max(20),
  cursor: z.number().nullish(),
});

export const eventRouter = createTRPCRouter({
  byClubId: publicProcedure
    .input(byClubIdSchema)
    .query(async ({ input, ctx }) => {
      const { clubId, currentTime, sortByDate } = input;

      try {
        const events = await ctx.db.query.events.findMany({
          where: (event) =>
            currentTime
              ? and(eq(event.clubId, clubId), gte(event.startTime, currentTime))
              : eq(event.clubId, clubId),
          orderBy: sortByDate ? (event) => [event.startTime] : undefined,
        });

        const parsed = events.map((e) => selectEvent.parse(e));
        return parsed;
      } catch (e) {
        console.error(e);

        throw e;
      }
    }),
  byDateRange: publicProcedure
    .input(byDateRangeSchema)
    .query(async ({ input, ctx }) => {
      const { startTime, endTime } = input;

      try {
        const events = await ctx.db.query.events.findMany({
          where: (event) => {
            return and(
              gte(event.startTime, startTime),
              lte(event.endTime, endTime),
            );
          },
        });

        const parsed = events.map((e) => selectEvent.parse(e));
        return parsed;
      } catch (e) {
        console.error(e);

        throw e;
      }
    }),
  fromDateRange: publicProcedure
    .input(fromDateRangeSchema)
    .query(async ({ input, ctx }) => {
      const { startTime, limit } = input;
      const offset = input.cursor ? input.cursor : 0;
      const events = await ctx.db.query.events.findMany({
        orderBy: (events, { asc }) => [asc(events.startTime)],
        limit: limit,
        offset: offset,
      });
      return { events: events, nextCursor: offset + limit };
    }),
});
