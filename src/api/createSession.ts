import { v4 as uuidv4 } from 'uuid';

import { apiEndpoint } from './constants';

export type CreateSessionResponse = {
  sessionId: string;
};

const createSession = async (): Promise<CreateSessionResponse> => {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { sessionId: uuidv4() };
  }

  const response = await fetch(`${apiEndpoint}/create-session`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Startup failed');
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = await response.json();

  return data as CreateSessionResponse;
};

export default createSession;
