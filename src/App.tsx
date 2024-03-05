import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';

import { createSession } from './api';

function App() {
  const [session, setSession] = useState<string | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const session = await createSession();
      setSession(() => session.sessionId);
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <div>Session ID: {session}</div>
      <div>Clicks: 0</div>
      <button>Click</button>
    </Stack>
  );
}

export default App
