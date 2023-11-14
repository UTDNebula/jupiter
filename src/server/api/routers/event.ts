import {
  eq,
  gte,
  lte,
  and,
  ilike,
  or,
  sql,
  inArray,
  type SQL,
  between,
} from 'drizzle-orm';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { selectEvent } from '@src/server/db/models';
import { type DateRange } from 'react-day-picker';
import { add } from 'date-fns';
import { userMetadataToEvents } from '@src/server/db/schema';
function isDateRange(value: unknown): value is DateRange {
  return Boolean(value && typeof value === 'object' && 'from' in value);
}

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
});

const byIdSchema = z.object({
  id: z.string().default(''),
});

const byNameSchema = z.object({
  name: z.string().default(''),
  sortByDate: z.boolean().default(false),
});
const joinLeaveSchema = z.object({
  id: z.string(),
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
    .output(
      z.object({
        events: z
          .object({
            id: z.string(),
            description: z.string(),
            clubId: z.string(),
            name: z.string(),
            startTime: z.date(),
            endTime: z.date(),
            club: z.object({
              id: z.string(),
              name: z.string(),
              image: z.string(),
              description: z.string(),
            }),
            liked: z.boolean().optional(),
            location: z.string(),
          })
          .array(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const startTime =
        input.startTime.type === 'now'
          ? new Date()
          : input.startTime.type === 'distance'
          ? add(new Date(), input.startTime.options)
          : input.startTime.options.from ?? new Date();
      const endTime =
        input.startTime.type === 'distance'
          ? new Date()
          : input.startTime.type === 'range'
          ? input.startTime.options.to
            ? add(input.startTime.options.to, { days: 1 })
            : add(startTime, { days: 1 })
          : undefined;
      const events = await ctx.db.query.events.findMany({
        where: (event) => {
          const whereElements: Array<SQL<unknown> | undefined> = [];
          if (!endTime) {
            whereElements.push(
              or(
                gte(event.startTime, startTime),
                gte(event.endTime, startTime),
              ),
            );
          } else {
            whereElements.push(
              or(
                between(event.startTime, startTime, endTime),
                between(event.endTime, startTime, endTime),
                and(
                  lte(event.startTime, startTime),
                  gte(event.endTime, startTime),
                ),
                and(lte(event.startTime, endTime), gte(event.endTime, endTime)),
              ),
            );
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
        with: {
          club: true,
        },
        limit: 20,
      });
      if (ctx.session) {
        const user = ctx.session.user;
        const eventsWithLike = await Promise.all(
          events.map(async (ev) => {
            const liked = !!(await ctx.db.query.userMetadataToEvents.findFirst({
              where: and(
                eq(userMetadataToEvents.userId, user.id),
                eq(userMetadataToEvents.eventId, ev.id),
              ),
            }));
            return { ...ev, liked: liked };
          }),
        );
        return { events: eventsWithLike };
      }
      return {
        events: events,
      };
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
  joinEvent: protectedProcedure
    .input(joinLeaveSchema)
    .mutation(async ({ input, ctx }) => {
      const eventId = input.id;
      const userId = ctx.session.user.id;
      await ctx.db
        .insert(userMetadataToEvents)
        .values({ userId: userId, eventId: eventId })
        .onConflictDoNothing();
    }),
  leaveEvent: protectedProcedure
    .input(joinLeaveSchema)
    .mutation(async ({ input, ctx }) => {
      const eventId = input.id;
      const userId = ctx.session.user.id;
      await ctx.db
        .delete(userMetadataToEvents)
        .where(
          and(
            eq(userMetadataToEvents.userId, userId),
            eq(userMetadataToEvents.eventId, eventId),
          ),
        );
    }),
  hasUser: protectedProcedure
    .input(byIdSchema)
    .query(async ({ input, ctx }) => {
      const eventId = input.id;
      const userId = ctx.session.user.id;
      try {
        const x = !!(await ctx.db.query.userMetadataToEvents.findFirst({
          where: and(
            eq(userMetadataToEvents.userId, userId),
            eq(userMetadataToEvents.eventId, eventId),
          ),
        }));
        return x;
      } catch {
        return false;
      }
    }),
  byName: publicProcedure.input(byNameSchema).query(async ({ input, ctx }) => {
    const { name, sortByDate } = input;

    try {
      const events = await ctx.db.query.events.findMany({
        where: (event) => ilike(event.name, `%${name}%`),
        orderBy: sortByDate
          ? (event, { desc }) => [desc(event.startTime)]
          : undefined,
      });

      return events;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }),
});
