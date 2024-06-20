import { AnalyseSessionResponse } from '../api';

const getAverageStoppedImmediately = (statsData: AnalyseSessionResponse) => {
  return Math.round(statsData.percetageStoppedImmediately);
};

export default getAverageStoppedImmediately;
