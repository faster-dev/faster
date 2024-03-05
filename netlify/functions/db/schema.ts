import { pgTable, uuid, timestamp, varchar, serial } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey(),
  dateCreated: timestamp('date_created').notNull(),
});

export const clicks = pgTable('clicks', {
  id: serial('id').primaryKey(),
  sessionId: uuid('session_id').references(() => sessions.id),
  dateCreated: timestamp('date_created', { precision: 6 }).notNull(),
  phase: varchar('phase', { length: 255 }).notNull(),
});
