import { AnalyseSessionResponse } from '../api';

const getStartRate = (statsData: AnalyseSessionResponse) => {
  const firstPhase = statsData.yourPhases[0];
  const secondPhase = statsData.yourPhases[1];
  const thirdPhase = statsData.yourPhases[2];

  return Math.round(
    (firstPhase.averageTime + secondPhase.averageTime + thirdPhase.averageTime) / 3,
  );
};

export default getStartRate;
