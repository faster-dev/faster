import dotenv from 'dotenv';

import { getDatabase } from '../netlify/functions/db/db';
import { analyseSession, createSession, updateSession } from '../netlify/functions/utilities';

dotenv.config();

const { db, client, schema } = await getDatabase();

const fakeClickData = [
  {
    phase: 0,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 1,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 2,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 3,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 4,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 5,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 6,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 7,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 8,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 9,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 10,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 11,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 12,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 13,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 14,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 15,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 16,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 17,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 18,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 19,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 20,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 21,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
  {
    phase: 22,
    clicks: [Date.now(), 132, 532, 634, 734, 834, 934, 1034, 1134, 1234, 1334, 1434, 1534, 1634],
  },
];

const sessionId = await createSession({ db, schema });

for (const { phase, clicks } of fakeClickData) {
  await updateSession({ db, schema, sessionId, clicks, phase, mobile: false });
}

const sessionAnalysis = await analyseSession({ db, schema, sessionId });

console.log(sessionAnalysis);

await client.end();
