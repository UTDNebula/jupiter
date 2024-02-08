import { type Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema',
  out: './src/server/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
  tablesFilter: ['test_*'],
  verbose: true,
} satisfies Config;
