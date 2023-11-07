import { eq, gte, lte, and, lt, or, sql, inArray, type SQL } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectEvent } from '@src/server/db/models';
import { DateTime } from 'luxon';
import { type DateRange, isDateRange } from 'react-day-picker';
import add from 'date-fns/add';
import isEqual from 'date-fns/isEqual';

const byClubIdSchema = z.object({
  clubId: z.string().default(''),
  currentTime: z.optional(z.date()),
  sortByDate: z.boolean().default(false),
});

const byDateRangeSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
});
const filterableSchema = z.object({
  startTime: z.union([
    z.literal('now'),
    z.object({ days: z.number() }),
    z.custom<DateRange>((val) => isDateRange(val)),
  ]),
  order: z.union([
    z.literal('soon'),
    z.literal('later'),
    z.literal('shortest duration'),
    z.literal('longest duration'),
  ]),
  club: z.string().array(),
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
  findByFilters: publicProcedure
    .input(filterableSchema)
    .query(async ({ input, ctx }) => {
      const { limit } = input;
      const startTime =
        input.startTime === 'now'
          ? new Date()
          : input.startTime instanceof Date
          ? input.startTime
          : isDateRange(input.startTime)
          ? input.startTime ?? new Date()
          : DateTime.now().plus(input.startTime).toJSDate();
      const endTime =
        input.startTime === 'now' || isDateRange(input.startTime)
          ? undefined
          : new Date();
      const offset = input.cursor ?? 0;
      const events = await ctx.db.query.events.findMany({
        where: (event) => {
          const whereElements: Array<SQL<unknown> | undefined> = [];
          if (isDateRange(startTime)) {
            if (startTime.from) {
              startTime.to ??= add(startTime.from, { days: 1 });
              whereElements.push(
                or(
                  and(
                    gte(event.startTime, startTime.from),
                    lte(event.endTime, startTime.to),
                  ),
                  and(
                    gte(event.endTime, startTime.from),
                    lte(event.startTime, startTime.to),
                  ),
                ),
              );
            }
          } else {
            whereElements.push(
              or(
                gte(event.startTime, startTime),
                gte(event.endTime, startTime),
              ),
            );
            whereElements.push(lte(event.endTime, endTime ?? event.endTime));
          }
          if (input.club.length !== 0) {
            whereElements.push(inArray(event.clubId, input.club));
          }
          return and(...whereElements);
        },
        orderBy: (events, { asc, desc }) => {
          switch (input.order) {
            case 'soon':
              return [asc(events.startTime)];
            case 'later':
              return [desc(events.startTime)];
            case 'shortest duration':
              return [asc(sql`${events.endTime} - ${events.startTime}`)];
            case 'longest duration':
              return [desc(sql`${events.endTime} - ${events.startTime}`)];
          }
        },
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
