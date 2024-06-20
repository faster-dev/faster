import { AnalyseSessionResponse } from '../api';

const getAverageSpeedIncrease = (statsData: AnalyseSessionResponse) => {
  const increasePhases = [3, 4, 5, 6, 7, 8];

  // 1. for each increase phase, get the percentage increase from the previous phase
  // 2. get the average of these percentages

  const increasePercentages = increasePhases.map((phase) => {
    const previousPhase = statsData.averagePhases[phase - 1];
    const currentPhase = statsData.averagePhases[phase];
    const previousAverage = previousPhase.averageTime;
    const currentAverage = currentPhase.averageTime;

    return Math.round(((currentAverage - previousAverage) / previousAverage) * 100);
  });
  const averageIncrease =
    increasePercentages.reduce((sum, increase) => sum + increase, 0) / increasePercentages.length;

  return Math.round(averageIncrease);
};

export default getAverageSpeedIncrease;
