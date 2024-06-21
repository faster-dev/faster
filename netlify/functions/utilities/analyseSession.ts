import { sql, countDistinct, eq, and, count, gt } from 'drizzle-orm';

import { Args } from './types';

export type AnalyseSessionArgs = Args & {
  sessionId: string;
};

export type AnalyseSessionResult = {
  clicksCount: number;
  stoppedImmediately: number;
  percentageStoppedImmediately: number;
  clicksPerSecondByPhase: {
    phase: number;
    averageTime: number;
  }[];
  yourPhases: {
    phase: number;
    averageTime: number;
  }[];
};

const analyseSession = async ({ db, schema, sessionId }: AnalyseSessionArgs) => {
  const totalClicksQuery = await db
    .select({
      value: countDistinct(schema.clicks.id),
    })
    .from(schema.clicks)
    .where(eq(schema.clicks.sessionId, sessionId));
  const clicksCount = totalClicksQuery[0]?.value;

  // select all clicks in session where phase is less than 14
  const stoppedImmediatelyQuery = await db
    .select({
      value: countDistinct(schema.clicks.id),
    })
    .from(schema.clicks)
    .where(and(eq(schema.clicks.sessionId, sessionId), gt(schema.clicks.phase, 13)));
  const stoppedImmediately = !stoppedImmediatelyQuery[0]?.value
    ? true
    : stoppedImmediatelyQuery[0]?.value === 0;

  // Subquery to find sessions with clicks where phase > 13
  const subquery = db
    .select({ sessionId: schema.clicks.sessionId })
    .from(schema.clicks)
    .where(gt(schema.clicks.phase, 13))
    .groupBy(schema.clicks.sessionId)
    .as('subquery');

  // Main query to find the number of sessions with 0 clicks where phase > 13
  const zeroClicksQuery = await db
    .select({ count: count() })
    .from(schema.sessions)
    .leftJoin(subquery, eq(schema.sessions.id, subquery.sessionId))
    .where(sql`"subquery"."session_id" IS NULL`);
  const zeroClicks = zeroClicksQuery[0]?.count;

  // count all sessions
  const totalSessionsQuery = await db
    .select({
      value: countDistinct(schema.sessions.id),
    })
    .from(schema.sessions);
  const totalSessions = totalSessionsQuery[0]?.value;
  const percentageStoppedImmediately = Math.round((zeroClicks / totalSessions) * 100);

  // your phases
  const clicksPerSecondByPhase = await db
    .select({
      phase: schema.clicks.phase,
      clicksPerSecond: sql<number>`count(*) / EXTRACT(EPOCH FROM (max(${schema.clicks.dateCreated}) - min(${schema.clicks.dateCreated})))`,
    })
    .from(schema.clicks)
    .where(eq(schema.clicks.sessionId, sessionId))
    .groupBy(schema.clicks.phase);
  type ClickPhase = { phase: number; averageTime: number };
  const unsortedYourPhases = clicksPerSecondByPhase.reduce((acc, row) => {
    return [
      ...acc,
      {
        phase: row.phase,
        averageTime: row.clicksPerSecond,
      },
    ];
  }, [] as ClickPhase[]);
  const yourPhases = [...unsortedYourPhases].sort((a, b) => a.phase - b.phase);

  // average phases
  const clicksPerSecondBySession = await db
    .select({
      sessionId: schema.clicks.sessionId,
      phase: schema.clicks.phase,
      clicksPerSecond: sql<number>`count(*) / EXTRACT(EPOCH FROM (max(${schema.clicks.dateCreated}) - min(${schema.clicks.dateCreated})))`,
    })
    .from(schema.clicks)
    .groupBy(schema.clicks.sessionId, schema.clicks.phase);
  type ExtendedClickPhase = ClickPhase & { count: number };
  const unsortedAveragePhases = clicksPerSecondBySession.reduce((acc, row) => {
    const existing = acc.find((item) => item.phase === row.phase);

    if (existing) {
      return acc.map((item) => {
        if (item.phase === row.phase) {
          return {
            ...item,
            averageTime: item.averageTime + parseFloat(row.clicksPerSecond),
            count: item.count + 1,
          };
        }

        return item;
      });
    }

    return [
      ...acc,
      {
        phase: row.phase,
        count: 1,
        averageTime: parseFloat(row.clicksPerSecond),
      },
    ];
  }, [] as ExtendedClickPhase[]);
  const averagePhases = unsortedAveragePhases.map((row) => {
    return {
      phase: row.phase,
      averageTime: row.averageTime / row.count,
    };
  });
  const sortedAveragePhases = [...averagePhases].sort((a, b) => a.phase - b.phase);

  return {
    clicksCount,
    stoppedImmediately,
    percentageStoppedImmediately,
    yourPhases,
    averagePhases: sortedAveragePhases,
  };
};

export default analyseSession;
