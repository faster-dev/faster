import { AnalyseSessionArgs, AnalyseSessionResponse } from './types';
import { apiEndpoint, fakeAnalyseSessionResponse } from './constants';

const analyseSession = async ({
  sessionId,
}: AnalyseSessionArgs): Promise<AnalyseSessionResponse> => {
  if (import.meta.env.DEV) {
    return fakeAnalyseSessionResponse(sessionId);
  }

  const response = await fetch(`${apiEndpoint}/analyse-session/${sessionId}`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Results failed');
  }

  const data = await response.json();

  return data as AnalyseSessionResponse;
};

export default analyseSession;
