import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { getDatabase } from './db';

const runMigrations = async () => {
  const { db, client } = await getDatabase();
  await migrate(db, { migrationsFolder: './drizzle' });
  await client.end();
}

runMigrations();