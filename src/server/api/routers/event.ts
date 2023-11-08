import {
  eq,
  gte,
  lte,
  and,
  or,
  sql,
  inArray,
  type SQL,
  between,
} from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectEvent } from '@src/server/db/models';
import { type DateRange, isDateRange } from 'react-day-picker';
import { add, isEqual } from 'date-fns';

const byClubIdSchema = z.object({
  clubId: z.string().default(''),
  currentTime: z.optional(z.date()),
  sortByDate: z.boolean().default(false),
});

const byDateRangeSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
});
export const findByFilterSchema = z.object({
  startTime: z.union([
    z.object({
      type: z.literal('now'),
    }),
    z.object({
      type: z.literal('distance'),
      options: z.object({ days: z.number().int() }),
    }),
    z.object({
      type: z.literal('range'),
      options: z.custom<DateRange>((val) => isDateRange(val)),
    }),
  ]),
  order: z.enum(['soon', 'later', 'shortest duration', 'longest duration']),
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
    .input(findByFilterSchema)
    .query(async ({ input, ctx }) => {
      const { limit } = input;
      const startTime =
        input.startTime.type === 'now'
          ? new Date()
          : input.startTime.type === 'distance'
          ? add(new Date(), input.startTime.options)
          : input.startTime.options ?? new Date();
      const endTime = input.startTime.type === 'range' ? new Date() : undefined;
      const offset = input.cursor ?? 0;
      const events = await ctx.db.query.events.findMany({
        where: (event) => {
          const whereElements: Array<SQL<unknown> | undefined> = [];
          if (isDateRange(startTime)) {
            if (startTime.from) {
              startTime.to ??= add(startTime.from, { days: 1 });
              if (isEqual(startTime.from, startTime.to)) {
                startTime.to = add(startTime.from, { days: 1 });
              }
              whereElements.push(
                or(
                  between(event.startTime, startTime.from, startTime.to),
                  between(event.endTime, startTime.from, startTime.to),
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
