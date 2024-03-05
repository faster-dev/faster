import React from 'react';
import ReactDOM from 'react-dom/client';

import { TimeProvider } from './hooks/TimeContext';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimeProvider>
      <App />
    </TimeProvider>
  </React.StrictMode>,
);
