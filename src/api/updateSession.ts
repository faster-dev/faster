import { apiEndpoint } from './constants';

export type UpdateSessionArgs = {
  sessionId: string;
  phase: number;
  clicks: number[];
};

const updateSession = async ({ sessionId, phase, clicks }: UpdateSessionArgs): Promise<void> => {
  if (import.meta.env.DEV) {
    console.debug('updateSession', sessionId, phase, clicks);

    return;
  }

  const response = await fetch(`${apiEndpoint}/update-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, phase, clicks }),
  });

  if (!response.ok) {
    throw new Error('Update failed');
  }
};

export default updateSession;
