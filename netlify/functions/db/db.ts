import fs from 'fs';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

export const getDatabase = async () => {
  const client = new pg.Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT || '0', 10),
    ssl: {
      ca: fs.readFileSync('ca-certificate.crt'),
    },
  });
  await client.connect();
  const db = drizzle(client, { schema });

  return { db, client };
};