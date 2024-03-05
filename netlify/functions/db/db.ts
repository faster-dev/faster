import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const certString = process.env.CA_CERTIFICATE || '';

export const getDatabase = async () => {
  const client = new pg.Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT || '0', 10),
    ssl: {
      ca: Buffer.from(certString.replace(/\\n/g, '\n')),
    },
  });
  await client.connect();
  const db = drizzle(client, { schema });

  return { db, client, schema };
};