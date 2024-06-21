import { v4 as uuidv4 } from 'uuid';

import { Args } from './types';

const createSession = async ({ db, schema }: Args) => {
  const sessionId = uuidv4();
  const dateCreated = new Date();

  await db.insert(schema.sessions).values({
    id: sessionId,
    dateCreated,
  });

  return sessionId;
};

export default createSession;
