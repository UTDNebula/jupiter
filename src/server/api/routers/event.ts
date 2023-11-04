import { eq, gte, lte, and, lt, or } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectEvent } from '@src/server/db/models';
import { DateTime } from 'luxon';

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
  startTime: z.union([
    z.literal('now'),
    z.object({ days: z.number() }),
    z.date(),
  ]),
  limit: z.number().min(1).max(20),
  cursor: z.number().nullish(),
});

const byIdSchema = z.object({
  id: z.string().default(''),
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
      const { limit } = input;
      const startTime =
        input.startTime === 'now'
          ? new Date()
          : input.startTime instanceof Date
          ? input.startTime
          : DateTime.now().plus(input.startTime).toJSDate();
      const endTime = input.startTime === 'now' ? undefined : new Date();
      const offset = input.cursor ?? 0;
      const events = await ctx.db.query.events.findMany({
        where: (event) =>
          and(
            or(gte(event.startTime, startTime), gte(event.endTime, startTime)),
            lte(event.endTime, endTime ?? event.endTime),
          ),
        orderBy: (events, { asc }) => [asc(events.startTime)],
        limit: limit,
        offset: offset,
      });
      return { events: events, nextCursor: offset + limit };
    }),
  byId: publicProcedure.input(byIdSchema).query(async ({ input, ctx }) => {
    const { id } = input;

    try {
      const byId = await ctx.db.query.events.findFirst({
        where: (event) => eq(event.id, id),
        with: { club: true },
      });

      return byId;
    } catch (e) {
      console.error(e);

      throw e;
    }
  }),
});
