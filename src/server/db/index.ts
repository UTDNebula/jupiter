import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '@src/env.mjs';
import * as schema from './schema';

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
