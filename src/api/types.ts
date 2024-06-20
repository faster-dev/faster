export type AnalyseSessionArgs = {
  sessionId: string;
};

export type PhaseDetails = {
  phase: number;
  averageTime: number;
  standardDeviation: number;
};

export type AnalyseSessionResponse = {
  sessionId: string;
  clicksCount: number;
  stoppedImmediately: boolean;
  percentageStoppedImmediately: number;
  yourPhases: PhaseDetails[];
  averagePhases: PhaseDetails[];
};
