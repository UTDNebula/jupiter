import { headers } from 'next/headers';

import { createCaller } from '@src/server/api/root';
import { createTRPCContext } from '@src/server/api/trpc';

const heads = new Headers(headers());
heads.set('x-trpc-source', 'rsc');
const createContext = await createTRPCContext({ headers: heads });

export const api = createCaller(createContext);
