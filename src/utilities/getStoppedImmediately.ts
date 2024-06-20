import { AnalyseSessionResponse } from '../api';

const getStoppedImmediately = (statsData: AnalyseSessionResponse) => {
  return statsData.stoppedImmediately;
};

export default getStoppedImmediately;
