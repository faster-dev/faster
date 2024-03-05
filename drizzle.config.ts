import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './netlify/functions/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_STRING!,
  },
} satisfies Config;