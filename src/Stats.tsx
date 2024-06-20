import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AnalyseSessionResponse } from './api';

export type StatsProps = {
  statsData: AnalyseSessionResponse;
};

const Stats: React.FunctionComponent<StatsProps> = ({ statsData }) => {
  // You pressed the button a total of X times
  const totalClicks = statsData.clicksCount;

  // You started pressing the button X times per second
  const startRate = 2.3;

  // This is Y% faster than average
  const startDifference = 20;
  const startDifferencePositive = startDifference > 0;
  const startDifferenceLabel = startDifferencePositive ? 'faster' : 'slower';

  // When told to go faster, you went X% faster
  const speedIncrease = 10;
  const speedIncreasePositive = speedIncrease > 0;
  const speedIncreaseLabel = speedIncreasePositive ? 'faster' : 'slower';

  // Most people go Y% faster
  const averageSpeedIncrease = 5;
  const averageSpeedIncreasePositive = averageSpeedIncrease > 0;
  const averageSpeedIncreaseLabel = averageSpeedIncreasePositive ? 'faster' : 'slower';

  // Your fastest speed was X times per second
  const fastestSpeed = 3.5;

  // This is Y% faster than average
  const fastestDifference = 10;
  const fastestDifferencePositive = fastestDifference > 0;
  const fastestDifferenceLabel = fastestDifferencePositive ? 'faster' : 'slower';

  // When told to stop, you:
  // - Stopped immediately - only X% of people do this
  // - Did not stop - Y% of people do this
  const stoppedImmediately = true;
  const stoppedImmediatelyPercentage = 20;
  const didNotStopPercentage = 80;

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start', width: '100%' }}>
      <Stack sx={{ border: '1px solid', borderRadius: 1, borderColor: 'lightgrey', padding: 2 }}>
        <Typography variant="h5">
          You pressed the button a total of{' '}
          <Typography variant="h5" component="span" color="green">
            {totalClicks}
          </Typography>{' '}
          times.
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        sx={{ border: '1px solid', borderRadius: 1, borderColor: 'lightgrey', padding: 2 }}
      >
        <Typography variant="h5">
          You started pressing the button{' '}
          <Typography variant="h5" component="span" color="green">
            {startRate}
          </Typography>{' '}
          times per second.
        </Typography>
        <Typography variant="h5">
          This is{' '}
          <Typography
            variant="h5"
            component="span"
            color={startDifferencePositive ? 'green' : 'red'}
          >
            {Math.abs(startDifference)}% {startDifferenceLabel}
          </Typography>{' '}
          than average.
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        sx={{ border: '1px solid', borderRadius: 1, borderColor: 'lightgrey', padding: 2 }}
      >
        <Typography variant="h5">
          When told to go faster, you went{' '}
          <Typography variant="h5" component="span" color="green">
            {speedIncrease}% {speedIncreaseLabel}
          </Typography>{' '}
          .
        </Typography>
        <Typography variant="h5">
          Most people go{' '}
          <Typography
            variant="h5"
            component="span"
            color={averageSpeedIncreasePositive ? 'green' : 'red'}
          >
            {Math.abs(averageSpeedIncrease)}% {averageSpeedIncreaseLabel}
          </Typography>{' '}
          .
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        sx={{ border: '1px solid', borderRadius: 1, borderColor: 'lightgrey', padding: 2 }}
      >
        <Typography variant="h5">
          Your fastest speed was{' '}
          <Typography variant="h5" component="span" color="green">
            {fastestSpeed}
          </Typography>{' '}
          times per second.
        </Typography>
        <Typography variant="h5">
          This is{' '}
          <Typography
            variant="h5"
            component="span"
            color={fastestDifferencePositive ? 'green' : 'red'}
          >
            {Math.abs(fastestDifference)}% {fastestDifferenceLabel}
          </Typography>{' '}
          than average.
        </Typography>
      </Stack>
      <Stack
        spacing={1}
        sx={{ border: '1px solid', borderRadius: 1, borderColor: 'lightgrey', padding: 2 }}
      >
        <Typography variant="h5">
          When told to stop, you{' '}
          {stoppedImmediately ? (
            <Typography variant="h5" component="span" color="green">
              stopped immediately
            </Typography>
          ) : (
            <Typography variant="h5" component="span" color="red">
              did not stop
            </Typography>
          )}
          .
        </Typography>
        <Typography variant="h5">
          {stoppedImmediately ? (
            <>
              Only{' '}
              <Typography variant="h5" component="span" color="green">
                {stoppedImmediatelyPercentage}%
              </Typography>{' '}
              of people do this.
            </>
          ) : (
            <>
              <Typography variant="h5" component="span" color="red">
                {didNotStopPercentage}%
              </Typography>{' '}
              of people do this.
            </>
          )}
        </Typography>
      </Stack>
      <Stack sx={{ alignSelf: 'stretch', '& img': { width: '100%', borderRadius: 1 } }}>
        <img src="/stop-it-stop.gif" />
      </Stack>
    </Stack>
  );
};

export default Stats;
