import { AnalyseSessionResponse } from '../api';

const getStartDifference = (statsData: AnalyseSessionResponse) => {
  const firstPhase = statsData.yourPhases[0];
  const secondPhase = statsData.yourPhases[1];
  const thirdPhase = statsData.yourPhases[2];
  const firstAveragePhase = statsData.averagePhases[0];
  const secondAveragePhase = statsData.averagePhases[1];
  const thirdAveragePhase = statsData.averagePhases[2];

  const yourAverage = Math.round(
    (firstPhase.averageTime + secondPhase.averageTime + thirdPhase.averageTime) / 3,
  );
  const averageAverage = Math.round(
    (firstAveragePhase.averageTime +
      secondAveragePhase.averageTime +
      thirdAveragePhase.averageTime) /
      3,
  );

  const difference = yourAverage - averageAverage;
  const max = Math.max(yourAverage, averageAverage);

  return Math.round((difference / max) * 100);
};

export default getStartDifference;
