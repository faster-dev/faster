import express, { Router } from 'express';
import serverless from 'serverless-http';
import { v4 as uuidv4, parse } from 'uuid';
import { sql, countDistinct, eq, max } from 'drizzle-orm';
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

  const totalClicksQuery = await db
    .select({
      value: countDistinct(schema.clicks.id),
    })
    .from(schema.clicks)
    .where(eq(schema.clicks.sessionId, sessionId));
  const clicksCount = totalClicksQuery[0]?.value;

  // stopped immediately is true if there are a maximum of 14 phases
  // get max phase value in session
  const maxPhaseQuery = await db
    .select({
      value: max(schema.clicks.phase),
    })
    .from(schema.clicks)
    .where(eq(schema.clicks.sessionId, sessionId));
  const maxPhase = maxPhaseQuery[0]?.value;
  const stoppedImmediately = (maxPhase || 0) <= 13;

  // get maximum phase value for each session
  const sessionsWithMaxPhases = await db
    .select({
      sessionId: schema.sessions.id,
      maxPhase: sql<number>`max(${schema.clicks.phase})`,
      count: countDistinct(schema.sessions.id),
    })
    .from(schema.sessions)
    .leftJoin(schema.clicks, eq(schema.sessions.id, schema.clicks.sessionId))
    .groupBy(schema.sessions.id)
    .having(({ maxPhase }) => eq(maxPhase, 13));
  const sessionsWithMaxPhasesCount = sessionsWithMaxPhases[0]?.count;

  // count all sessions
  const totalSessionsQuery = await db
    .select({
      value: countDistinct(schema.sessions.id),
    })
    .from(schema.sessions);
  const totalSessions = totalSessionsQuery[0]?.value;
  const percetageStoppedImmediately = Math.round(
    (sessionsWithMaxPhasesCount / totalSessions) * 100,
  );

  res.json({
    sessionId,
    clicksCount,
    stoppedImmediately,
    maxPhase,
    sessionsWithMaxPhasesCount,
    totalSessions,
    percetageStoppedImmediately,
    yourPhases: [
      {
        phase: 0,
        averageTime: 1,
        standardDeviation: 0.1,
      },
      {
        phase: 1,
        averageTime: 1.1,
        standardDeviation: 0.2,
      },
      {
        phase: 2,
        averageTime: 1.2,
        standardDeviation: 0.3,
      },
      {
        phase: 3,
        averageTime: 1.3,
        standardDeviation: 0.4,
      },
      {
        phase: 4,
        averageTime: 1.4,
        standardDeviation: 0.5,
      },
      {
        phase: 5,
        averageTime: 1.5,
        standardDeviation: 0.6,
      },
      {
        phase: 6,
        averageTime: 1.6,
        standardDeviation: 0.7,
      },
      {
        phase: 7,
        averageTime: 1.7,
        standardDeviation: 0.8,
      },
      {
        phase: 8,
        averageTime: 1.8,
        standardDeviation: 0.9,
      },
      {
        phase: 9,
        averageTime: 1.9,
        standardDeviation: 1,
      },
      {
        phase: 10,
        averageTime: 2,
        standardDeviation: 1.1,
      },
      {
        phase: 11,
        averageTime: 2.1,
        standardDeviation: 1.2,
      },
      {
        phase: 12,
        averageTime: 2.2,
        standardDeviation: 1.3,
      },
      {
        phase: 13,
        averageTime: 2.3,
        standardDeviation: 1.4,
      },
      {
        phase: 14,
        averageTime: 2.4,
        standardDeviation: 1.5,
      },
      {
        phase: 15,
        averageTime: 2.5,
        standardDeviation: 1.6,
      },
      {
        phase: 16,
        averageTime: 2.6,
        standardDeviation: 1.7,
      },
      {
        phase: 17,
        averageTime: 2.7,
        standardDeviation: 1.8,
      },
      {
        phase: 18,
        averageTime: 2.8,
        standardDeviation: 1.9,
      },
      {
        phase: 19,
        averageTime: 2.9,
        standardDeviation: 2,
      },
      {
        phase: 20,
        averageTime: 3,
        standardDeviation: 2.1,
      },
      {
        phase: 21,
        averageTime: 3.1,
        standardDeviation: 2.2,
      },
      {
        phase: 22,
        averageTime: 3.2,
        standardDeviation: 2.3,
      },
    ],
    averagePhases: [
      {
        phase: 0,
        averageTime: 1,
        standardDeviation: 0.1,
      },
      {
        phase: 1,
        averageTime: 1.1,
        standardDeviation: 0.2,
      },
      {
        phase: 2,
        averageTime: 1.2,
        standardDeviation: 0.3,
      },
      {
        phase: 3,
        averageTime: 1.3,
        standardDeviation: 0.4,
      },
      {
        phase: 4,
        averageTime: 1.4,
        standardDeviation: 0.5,
      },
      {
        phase: 5,
        averageTime: 1.5,
        standardDeviation: 0.6,
      },
      {
        phase: 6,
        averageTime: 1.6,
        standardDeviation: 0.7,
      },
      {
        phase: 7,
        averageTime: 1.7,
        standardDeviation: 0.8,
      },
      {
        phase: 8,
        averageTime: 1.8,
        standardDeviation: 0.9,
      },
      {
        phase: 9,
        averageTime: 1.9,
        standardDeviation: 1,
      },
      {
        phase: 10,
        averageTime: 2,
        standardDeviation: 1.1,
      },
      {
        phase: 11,
        averageTime: 2.1,
        standardDeviation: 1.2,
      },
      {
        phase: 12,
        averageTime: 2.2,
        standardDeviation: 1.3,
      },
      {
        phase: 13,
        averageTime: 2.3,
        standardDeviation: 1.4,
      },
      {
        phase: 14,
        averageTime: 2.4,
        standardDeviation: 1.5,
      },
      {
        phase: 15,
        averageTime: 2.5,
        standardDeviation: 1.6,
      },
      {
        phase: 16,
        averageTime: 2.6,
        standardDeviation: 1.7,
      },
      {
        phase: 17,
        averageTime: 2.7,
        standardDeviation: 1.8,
      },
      {
        phase: 18,
        averageTime: 2.8,
        standardDeviation: 1.9,
      },
      {
        phase: 19,
        averageTime: 2.9,
        standardDeviation: 2,
      },
      {
        phase: 20,
        averageTime: 3,
        standardDeviation: 2.1,
      },
      {
        phase: 21,
        averageTime: 3.1,
        standardDeviation: 2.2,
      },
      {
        phase: 22,
        averageTime: 3.2,
        standardDeviation: 2.3,
      },
    ],
  });
});

// add basic hello endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

api.use('/api/', router);

export const handler = serverless(api);
