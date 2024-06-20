import { AnalyseSessionResponse } from './types';

export const apiEndpoint = '/api';

export const fakeAnalyseSessionResponse = (sessionId: string): AnalyseSessionResponse => ({
  sessionId,
  clicksCount: 100,
  stoppedImmediately: false,
  percetageStoppedImmediately: 20,
  yourPhases: [
    {
      phase: 0,
      averageTime: 1,
      standardDeviation: 0.1,
    },
    {
      phase: 1,
      averageTime: 1.1,
      standardDeviation: 0.2,
    },
    {
      phase: 2,
      averageTime: 1.2,
      standardDeviation: 0.3,
    },
    {
      phase: 3,
      averageTime: 1.3,
      standardDeviation: 0.4,
    },
    {
      phase: 4,
      averageTime: 1.4,
      standardDeviation: 0.5,
    },
    {
      phase: 5,
      averageTime: 1.5,
      standardDeviation: 0.6,
    },
    {
      phase: 6,
      averageTime: 1.6,
      standardDeviation: 0.7,
    },
    {
      phase: 7,
      averageTime: 1.7,
      standardDeviation: 0.8,
    },
    {
      phase: 8,
      averageTime: 1.8,
      standardDeviation: 0.9,
    },
    {
      phase: 9,
      averageTime: 1.9,
      standardDeviation: 1,
    },
    {
      phase: 10,
      averageTime: 2,
      standardDeviation: 1.1,
    },
    {
      phase: 11,
      averageTime: 2.1,
      standardDeviation: 1.2,
    },
    {
      phase: 12,
      averageTime: 2.2,
      standardDeviation: 1.3,
    },
    {
      phase: 13,
      averageTime: 2.3,
      standardDeviation: 1.4,
    },
    {
      phase: 14,
      averageTime: 2.4,
      standardDeviation: 1.5,
    },
    {
      phase: 15,
      averageTime: 2.5,
      standardDeviation: 1.6,
    },
    {
      phase: 16,
      averageTime: 2.6,
      standardDeviation: 1.7,
    },
    {
      phase: 17,
      averageTime: 2.7,
      standardDeviation: 1.8,
    },
    {
      phase: 18,
      averageTime: 2.8,
      standardDeviation: 1.9,
    },
    {
      phase: 19,
      averageTime: 2.9,
      standardDeviation: 2,
    },
    {
      phase: 20,
      averageTime: 3,
      standardDeviation: 2.1,
    },
    {
      phase: 21,
      averageTime: 3.1,
      standardDeviation: 2.2,
    },
    {
      phase: 22,
      averageTime: 3.2,
      standardDeviation: 2.3,
    },
  ],
  averagePhases: [
    {
      phase: 0,
      averageTime: 1,
      standardDeviation: 0.1,
    },
    {
      phase: 1,
      averageTime: 1.1,
      standardDeviation: 0.2,
    },
    {
      phase: 2,
      averageTime: 1.2,
      standardDeviation: 0.3,
    },
    {
      phase: 3,
      averageTime: 1.3,
      standardDeviation: 0.4,
    },
    {
      phase: 4,
      averageTime: 1.4,
      standardDeviation: 0.5,
    },
    {
      phase: 5,
      averageTime: 1.5,
      standardDeviation: 0.6,
    },
    {
      phase: 6,
      averageTime: 1.6,
      standardDeviation: 0.7,
    },
    {
      phase: 7,
      averageTime: 1.7,
      standardDeviation: 0.8,
    },
    {
      phase: 8,
      averageTime: 1.8,
      standardDeviation: 0.9,
    },
    {
      phase: 9,
      averageTime: 1.9,
      standardDeviation: 1,
    },
    {
      phase: 10,
      averageTime: 2,
      standardDeviation: 1.1,
    },
    {
      phase: 11,
      averageTime: 2.1,
      standardDeviation: 1.2,
    },
    {
      phase: 12,
      averageTime: 2.2,
      standardDeviation: 1.3,
    },
    {
      phase: 13,
      averageTime: 2.3,
      standardDeviation: 1.4,
    },
    {
      phase: 14,
      averageTime: 2.4,
      standardDeviation: 1.5,
    },
    {
      phase: 15,
      averageTime: 2.5,
      standardDeviation: 1.6,
    },
    {
      phase: 16,
      averageTime: 2.6,
      standardDeviation: 1.7,
    },
    {
      phase: 17,
      averageTime: 2.7,
      standardDeviation: 1.8,
    },
    {
      phase: 18,
      averageTime: 2.8,
      standardDeviation: 1.9,
    },
    {
      phase: 19,
      averageTime: 2.9,
      standardDeviation: 2,
    },
    {
      phase: 20,
      averageTime: 3,
      standardDeviation: 2.1,
    },
    {
      phase: 21,
      averageTime: 3.1,
      standardDeviation: 2.2,
    },
    {
      phase: 22,
      averageTime: 3.2,
      standardDeviation: 2.3,
    },
  ],
});
