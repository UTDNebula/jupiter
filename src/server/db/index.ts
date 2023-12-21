import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '@src/env.mjs';

import * as club from './schema/club';
import * as contacts from './schema/contacts';
import * as events from './schema/events';
import * as users from './schema/users';
import * as admin from './schema/admin';

const schema = { ...club, ...contacts, ...events, ...users, ...admin };

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
