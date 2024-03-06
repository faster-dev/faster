import { apiEndpoint } from './constants';

export type UpdateSessionArgs = {
  sessionId: string;
  phase: number;
  clicks: number[];
  mobile: boolean;
};

const updateSession = async ({
  sessionId,
  phase,
  clicks,
  mobile,
}: UpdateSessionArgs): Promise<void> => {
  if (import.meta.env.DEV) {
    console.debug('updateSession', sessionId, phase, clicks, mobile);

    return;
  }

  const response = await fetch(`${apiEndpoint}/update-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, phase, clicks, mobile }),
  });

  if (!response.ok) {
    throw new Error('Update failed');
  }
};

export default updateSession;
