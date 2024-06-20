import { AnalyseSessionResponse } from '../api';

const getAverageStoppedImmediately = (statsData: AnalyseSessionResponse) => {
  return Math.round(statsData.percentageStoppedImmediately);
};

export default getAverageStoppedImmediately;
