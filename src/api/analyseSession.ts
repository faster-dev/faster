import { apiEndpoint } from './constants';

export type AnalyseSessionArgs = {
  sessionId: string;
};

export type AnalyseSessionResponse = {
  sessionId: string;
  clicksCount: number;
};

const analyseSession = async ({
  sessionId,
}: AnalyseSessionArgs): Promise<AnalyseSessionResponse> => {
  if (import.meta.env.DEV) {
    return { sessionId, clicksCount: 10 };
  }

  const response = await fetch(`${apiEndpoint}/analyse-session/${sessionId}`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Results failed');
  }

  const data = await response.json();

  return data as AnalyseSessionResponse;
};

export default analyseSession;
