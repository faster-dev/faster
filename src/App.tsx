import { useEffect, useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useTime, useIsMobile } from './hooks';
import { createSession, updateSession } from './api';

const clicksPerPhase = [
  5, 20, 30, 10, 20, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10, 30, 30, 30, 30, 30, 30, 30, 30,
];
const timeoutTicksPerPhase = (phase: number) => {
  if (phase < 10) {
    return 60;
  }

  return 10;
};

const App = () => {
  const { t1 } = useTime();
  const [timeoutTicks, setTimeoutTicks] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const { isMobile } = useIsMobile();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const [clicksCache, setClicksCache] = useState<number[]>([]);
  const [clicks, setClicks] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const handleClick = useCallback(() => {
    const newClick = Date.now();

    setClicks((prev) => {
      if (prev.length === 0) {
        return [newClick];
      }

      return [...prev, newClick - prev[0]];
    });
    setClickCount((prev) => prev + 1);

    if (phase < clicksPerPhase.length - 1) {
      setTimeoutTicks(() => 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setClicks, setClickCount]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await createSession();
      setSessionId(() => session.sessionId);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const phaseClicks = clicksPerPhase[phase];

    if (clickCount === phaseClicks) {
      setPhase((prev) => prev + 1);
      setClickCount(() => 0);
      setClicks(() => []);
    }
  }, [phase, clickCount]);

  useEffect(() => {
    if (clicks.length > 0) {
      setClicksCache(() => clicks);
    } else {
      setClicksCache(() => []);
    }
  }, [clicks]);

  useEffect(() => {
    if (phase && sessionId) {
      updateSession({ sessionId, phase, clicks: clicksCache, mobile: isMobile });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    const timeoutTicksForPhase = timeoutTicksPerPhase(phase);

    if (timeoutTicks === timeoutTicksForPhase) {
      if (phase === 0) {
        setTimeoutTicks(() => 0);
      } else if (phase < 10) {
        if (sessionId) {
          updateSession({ sessionId, phase, clicks: clicksCache, mobile: isMobile });
        }

        setTimeoutTicks((prev) => prev + 1);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setShowStats(() => true);
      }
    } else {
      setTimeoutTicks((prev) => prev + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t1]);

  const loading = useMemo(
    () => (
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          opacity: sessionId ? 0 : 1,
          transition: 'opacity ease-in-out 0.3s',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Typography sx={{ fontFamily: 'copperplate', fontSize: 20 }}>Faster</Typography>
      </Stack>
    ),
    [sessionId],
  );
  const message = useMemo(() => {
    switch (phase) {
      case 0:
        return '';
      case 1:
        return 'Keep going';
      case 2:
        return 'Now slowly and with a consistent rhythm';
      case 3:
        return 'Try a bit faster now';
      case 4:
        return 'Faster, but pace yourself';
      case 5:
        return 'More';
      case 6:
        return 'MORE';
      case 7:
        return 'FASTER';
      case 8:
        return 'Literally as fast as you can';
      case 9:
        return 'You are a machine';
      case 10:
        return 'Ok, now chill';
      case 11:
        return 'You are done';
      case 12:
        return 'Thank you for your service';
      case 13:
        return 'You can stop now';
      case 14:
        return 'Seriously, stop';
      case 15:
        return <img src="/its-time-to-stop-stop.gif" />;
      case 16:
        return <img src="/stop-it-stop.gif" />;
      case 17:
        return <img src="/stop-office.webp" />;
      case 18:
        return <img src="/stop-it.webp" />;
      case 19:
        return <img src="/facepalm.webp" />;
      case 20:
        return <img src="/cut-it-out.webp" />;
      case 21:
        return <img src="/i-will-find-you.webp" />;
      case 22:
        return 'Goodbye';
    }
  }, [phase]);
  const messageContainer = useMemo(
    () => (
      <Stack
        sx={{
          height: '33%',
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          textAlign: 'center',
          '& img': {
            width: '100%',
            position: 'relative',
            top: '60px',
          },
        }}
      >
        <Typography sx={{ fontSize: 20, pointerEvents: 'none', userSelect: 'none' }}>
          {message}
        </Typography>
      </Stack>
    ),
    [message],
  );
  const buttonAction = useMemo(() => (isMobile ? 'Tap' : 'Click'), [isMobile]);
  const button = useMemo(
    () => (
      <Stack
        sx={{
          height: '33%',
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Button
          sx={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 12,
            padding: '1px 2px',
            transition: 'all 0.2s ease',
            textTransform: 'none',
            boxShadow: 'none',
            height: 120,
            width: 120,
            borderRadius: 100,
          }}
          variant="contained"
          onClick={handleClick}
        >
          <Typography sx={{ fontSize: 20 }}>{buttonAction} me!</Typography>
        </Button>
      </Stack>
    ),
    [buttonAction, handleClick],
  );
  const ui = useMemo(
    () => (
      <Stack
        spacing={2}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          opacity: sessionId && !showStats ? 1 : 0,
          transition: 'opacity ease-in-out 0.3s',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'flex-start',
          }}
        >
          {messageContainer}
          {button}
        </Stack>
      </Stack>
    ),
    [sessionId, showStats, messageContainer, button],
  );
  const stats = useMemo(
    () => (
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          opacity: showStats ? 1 : 0,
          pointerEvents: showStats ? 'auto' : 'none',
          transition: 'opacity ease-in-out 0.3s',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Typography sx={{ fontFamily: 'copperplate', fontSize: 20 }}>STATS</Typography>
        </Stack>
      </Stack>
    ),
    [showStats],
  );

  return (
    <Box
      sx={{
        position: 'relative',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
      }}
    >
      {loading}
      {ui}
      {stats}
    </Box>
  );
};

export default App;
