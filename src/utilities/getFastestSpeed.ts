import { AnalyseSessionResponse } from '../api';

const getFastestSpeed = (statsData: AnalyseSessionResponse) => {
  let fastestSpeed = 0;

  for (const phase of statsData.yourPhases) {
    if (phase.averageTime > fastestSpeed) {
      fastestSpeed = phase.averageTime;
    }
  }

  return fastestSpeed.toFixed(3);
};

export default getFastestSpeed;
