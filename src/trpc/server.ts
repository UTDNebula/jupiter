import { headers as getHeaders } from 'next/headers';
import { appRouter } from '@src/server/api/root';
import { createCallerFactory, createTRPCContext } from '@src/server/api/trpc';
import { cache } from 'react';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { QueryClient } from '@tanstack/react-query';

const createContext = cache(async () => {
  const headers = await getHeaders();
  const heads = new Headers(headers);
  heads.set('x-trpc-source', 'rsc');
  return createTRPCContext({ headers: heads });
});

const caller = createCallerFactory(appRouter)(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, () => new QueryClient());
