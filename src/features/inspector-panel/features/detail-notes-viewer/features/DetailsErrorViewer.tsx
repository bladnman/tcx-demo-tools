import TWEvent from '@classes/data/TWEvent.ts';
import { VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function DetailsErrorViewer({ event }: { event: TWEvent }) {
  const { failures } = event;

  if (!failures) {
    return (
      <VStack hFill left spacing={1}>
        No error failures available. Looks like everything is good.
      </VStack>
    );
  }
  const renderFailures = () => {
    const failureKeys = Object.keys(failures);
    if (!failureKeys.length) {
      return null;
    }
    return failureKeys.map((key) => {
      const failureList = failures[key];
      return (
        <VStack left key={key} spacing={0}>
          <Typography variant={'subtitle1'} fontWeight={'bolder'}>
            {key}
          </Typography>
          <ul>
            {failureList.map((failureMsg, index) => {
              return (
                <li>
                  <Typography key={index} color={'error.main'}>
                    {failureMsg}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </VStack>
      );
    });
  };
  return (
    <VStack hFill left spacing={1}>
      <Typography variant={'h5'}>Telemetry Errors</Typography>
      {renderFailures()}
    </VStack>
  );
}
