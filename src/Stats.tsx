import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AnalyseSessionResponse } from './api';
import {
  getAverageFastestSpeed,
  getAverageSpeedIncrease,
  getAverageStoppedImmediately,
  getFastestSpeed,
  getSpeedIncrease,
  getStartDifference,
  getStartRate,
  getStoppedImmediately,
} from './utilities';

export type StatsProps = {
  statsData: AnalyseSessionResponse;
};

const Stats: React.FunctionComponent<StatsProps> = ({ statsData }) => {
  // You pressed the button a total of X times
  const totalClicks = statsData.clicksCount;

  // You started pressing the button X times per second
  const startRate = getStartRate(statsData);

  // This is Y% faster than average
  const startDifference = getStartDifference(statsData);
  const startDifferencePositive = startDifference > 0;
  const startDifferenceZero = Math.abs(startDifference) < 5;
  const startDifferenceLabel = startDifferencePositive ? 'faster' : 'slower';

  // When told to go faster, you went X% faster
  const speedIncrease = getSpeedIncrease(statsData);
  const speedIncreasePositive = speedIncrease > 0;
  const speedIncreaseLabel = speedIncreasePositive ? 'faster' : 'slower';

  // Most people go Y% faster
  const averageSpeedIncrease = getAverageSpeedIncrease(statsData);
  const averageSpeedIncreasePositive = averageSpeedIncrease > 0;
  const averageSpeedIncreaseZero = Math.abs(averageSpeedIncrease - speedIncrease) < 5;
  const averageSpeedIncreaseLabel = averageSpeedIncreasePositive ? 'faster' : 'slower';

  // Your fastest speed was X times per second
  const fastestSpeed = getFastestSpeed(statsData);

  // This is Y% faster than average
  const fastestDifference = getAverageFastestSpeed(statsData);
  const fastestDifferencePositive = fastestDifference > 0;
  const fastestDifferenceZero = Math.abs(fastestDifference) < 5;
  const fastestDifferenceLabel = fastestDifferencePositive ? 'faster' : 'slower';

  // When told to stop, you:
  // - Stopped immediately - only X% of people do this
  // - Did not stop - Y% of people do this
  const stoppedImmediately = getStoppedImmediately(statsData);
  const stoppedImmediatelyPercentage = getAverageStoppedImmediately(statsData);
  const stoppedImmediatelySmall = stoppedImmediatelyPercentage < 50;
  const didNotStopPercentage = 100 - stoppedImmediatelyPercentage;
  const didNotStopSmall = didNotStopPercentage < 50;

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
        {startDifferenceZero ? (
          <Typography variant="h5">This is average, you average, average person.</Typography>
        ) : (
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
        )}
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
        {averageSpeedIncreaseZero ? (
          <Typography variant="h5">
            This is what most people do. You're just like everyone else.
          </Typography>
        ) : (
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
        )}
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
        {fastestDifferenceZero ? (
          <Typography variant="h5">
            This is <u>average</u>. You've done it again.
          </Typography>
        ) : (
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
        )}
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
              <Typography variant="h5" component="span" color="green">
                {stoppedImmediatelyPercentage}%
              </Typography>{' '}
              of people do this.
              {stoppedImmediatelySmall ? (
                <Typography variant="h5" component="span">
                  This is <u>unusual</u>. You're a rare breed.
                </Typography>
              ) : (
                <Typography variant="h5" component="span" color="red">
                  This is <u>normal</u>. You are not special.
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography variant="h5" component="span" color="green">
                {didNotStopPercentage}%
              </Typography>{' '}
              of people do this.
              {didNotStopSmall ? (
                <Typography variant="h5" component="span">
                  This is <u>unusual</u>. You're a rare breed.
                </Typography>
              ) : (
                <Typography variant="h5" component="span">
                  This is <u>normal</u>. You are not special. However, you have a{' '}
                  <u>problem with authority</u>.
                </Typography>
              )}
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
