import { apiEndpoint } from './constants';

export type CreateSessionResponse = {
  sessionId: string;
};

const createSession = async (): Promise<CreateSessionResponse> => {
  const response = await fetch(`${apiEndpoint}/create-session`, { method: 'GET' });
  const data = await response.json();

  return data as CreateSessionResponse;
};

export default createSession;