import { AnalyseSessionResponse } from '../api';
import getFastestSpeed from './getFastestSpeed';

const getAverageFastestSpeed = (statsData: AnalyseSessionResponse) => {
  const fastestSpeed = parseFloat(getFastestSpeed(statsData));

  let averageFastestSpeed = 0;

  for (const phase of statsData.averagePhases) {
    if (phase.averageTime > averageFastestSpeed) {
      averageFastestSpeed = phase.averageTime;
    }
  }

  const difference = averageFastestSpeed - fastestSpeed;
  const max = Math.max(averageFastestSpeed, fastestSpeed);
  const percentage = Math.round((difference / max) * 100);

  return percentage;
};

export default getAverageFastestSpeed;
