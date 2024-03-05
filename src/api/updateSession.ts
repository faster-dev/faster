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
  await fetch(`${apiEndpoint}/update-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, clicks }),
  });
};

export default updateSession;