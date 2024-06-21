import dotenv from 'dotenv';

import { getDatabase } from '../netlify/functions/db/db';

dotenv.config();

const { db, client, schema } = await getDatabase();

// Purge all sessions and clicks
await db.delete(schema.clicks).execute();
await db.delete(schema.sessions).execute();

// Close the database connection
await client.end();
