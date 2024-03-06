import express, { Router } from 'express';
import serverless from 'serverless-http';
import { v4 as uuidv4, parse } from 'uuid';
import { countDistinct, eq } from 'drizzle-orm';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';

import { getDatabase } from './db/db';

const api = express();
api.use(express.json());

const router = Router();

router.get('/create-session', async (req, res) => {
  const { db, schema } = await getDatabase();
  const sessionId = uuidv4();
  const dateCreated = new Date();

  await db.insert(schema.sessions).values({
    id: sessionId,
    dateCreated,
  });

  res.json({ sessionId });
});

router.post('/update-session', async (req, res) => {
  const { db, schema } = await getDatabase();
  const { sessionId, phase, clicks, mobile } = req.body;

  if (!sessionId || !phase || !clicks) {
    console.error('Invalid request - missing sessionId, phase, or clicks.', {
      sessionId,
      phase,
      clicks,
    });
    return res.status(400).json({ message: 'Invalid request.' });
  }

  try {
    parse(sessionId);
  } catch (error) {
    console.error('Invalid session ID.', { sessionId });
    return res.status(400).json({ message: 'Invalid session ID.' });
  }

  if (typeof phase !== 'number') {
    console.error('Invalid phase.', { phase });
    return res.status(400).json({ message: 'Invalid phase.' });
  }

  if (!Array.isArray(clicks)) {
    console.error('Invalid clicks data.', { clicks });
    return res.status(400).json({ message: 'Invalid clicks data.' });
  }

  if (!clicks.every(isNumber)) {
    console.error('Invalid clicks data.', { clicks });
    return res.status(400).json({ message: 'Invalid clicks data.' });
  }

  if (!isBoolean(mobile)) {
    console.error('Invalid mobile data.', { mobile });
    return res.status(400).json({ message: 'Invalid mobile data.' });
  }

  const sessionResult = await db
    .select({
      value: countDistinct(schema.sessions.id),
    })
    .from(schema.sessions)
    .where(eq(schema.sessions.id, sessionId));

  if (sessionResult[0]?.value === 0) {
    console.error('Session not found.', { sessionId });
    return res.status(404).json({ message: 'Session not found.' });
  }

  await Promise.all(
    clicks.map((click, index) => {
      const timestamp = index === 0 ? click : clicks[0] + click;

      db.insert(schema.clicks).values({
        sessionId,
        dateCreated: new Date(timestamp),
        phase,
        mobile,
      });
    }),
  );

  res.json({ message: 'Session updated successfully.' });
});

router.get('/analyse-session/:sessionId', async (req, res) => {
  const { db, schema } = await getDatabase();
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ message: 'Invalid request.' });
  }

  try {
    parse(sessionId);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid session ID.' });
  }

  const result = await db
    .select({
      value: countDistinct(schema.clicks.id),
    })
    .from(schema.clicks)
    .where(eq(schema.clicks.sessionId, sessionId));
  const clicksCount = result[0]?.value;

  res.json({ sessionId, clicksCount });
});

// add basic hello endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

api.use('/api/', router);

export const handler = serverless(api);
