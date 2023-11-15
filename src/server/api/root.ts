import { createTRPCRouter } from '@src/server/api/trpc';
import { clubRouter } from './routers/club';
import { eventRouter } from './routers/event';
import { userMetadataRouter } from './routers/userMetadata';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  club: clubRouter,
  event: eventRouter,
  userMetadata: userMetadataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
