import { apiEndpoint } from './constants';

export type AnalyseSessionArgs = {
  sessionId: string;
};

export type AnalyseSessionResponse = {
  sessionId: string;
  clicksCount: number;
};

const analyseSession = async ({ sessionId }: AnalyseSessionArgs): Promise<AnalyseSessionResponse> => {
  const response = await fetch(`${apiEndpoint}/analyse-session/${sessionId}`, { method: 'GET' });
  const data = await response.json();

  return data as AnalyseSessionResponse;
};

export default analyseSession;