import { AnalyseSessionResponse } from '../api';

const getStartRate = (statsData: AnalyseSessionResponse) => {
  const firstPhase = statsData.yourPhases[0];
  const secondPhase = statsData.yourPhases[1];
  const thirdPhase = statsData.yourPhases[2];
  const average = (firstPhase.averageTime + secondPhase.averageTime + thirdPhase.averageTime) / 3;

  return average.toFixed(3);
};

export default getStartRate;
