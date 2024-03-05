import { apiEndpoint } from './constants';

export type NewClick = {
  dateCreated: string;
  phase: string;
};

export type UpdateSessionArgs = {
  sessionId: string;
  clicks: NewClick[];
};

const updateSession = async ({ sessionId, clicks }: UpdateSessionArgs): Promise<void> => {
  if (import.meta.env.DEV) {
    console.debug('updateSession', sessionId, clicks);

    return;
  }

  const response = await fetch(`${apiEndpoint}/update-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, clicks }),
  });

  if (!response.ok) {
    throw new Error('Update failed');
  }
};

export default updateSession;
