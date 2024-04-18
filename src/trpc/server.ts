import { headers } from 'next/headers';

import { createCaller } from '@src/server/api/root';
import { createTRPCContext } from '@src/server/api/trpc';
import { cache } from 'react';

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');
  return createTRPCContext({ headers: heads });
});

export const api = createCaller(createContext);
