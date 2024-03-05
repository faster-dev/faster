import { useEffect, useState, PropsWithChildren, useMemo } from 'react';

import TimeContext from './TimeContext';

const TimeProvider: React.FunctionComponent<PropsWithChildren<object>> = ({ children }) => {
  const [t1, setT1] = useState(false);
  const [t10, setT10] = useState(false);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      setT10((t) => !t);

      if (count % 10 === 0) {
        setT1((t) => !t);
      }

      count += 1;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const value = useMemo(() => ({ t1, t10 }), [t1, t10]);

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
