import { AnalyseSessionResponse } from './api';

export type StatsProps = {
  statsData: AnalyseSessionResponse;
};

const Stats: React.FunctionComponent<StatsProps> = ({ statsData }) => {
  return (
    <div>
      <h1>Stats</h1>
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Average time</th>
            <th>Standard deviation</th>
          </tr>
        </thead>
        <tbody>
          {statsData.yourPhases.map((phase) => (
            <tr key={phase.phase}>
              <td>{phase.phase}</td>
              <td>{phase.averageTime}</td>
              <td>{phase.standardDeviation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
