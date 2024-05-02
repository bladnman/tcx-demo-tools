import { Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import { version, repository } from '../../../../../../../../package.json';

export default function AboutOptions() {
  return (
    <VStack topLeft spacing={1}>
      <Typography variant={'h5'}>Source</Typography>
      <Typography>
        Telemetry Viewer is a tool for viewing and analyzing telemetry data. If you are
        looking for more information about the tool, adding new functionality, reporting a
        bug, or telling the team how wonderful they are, please look up the <b>Ghost</b>{' '}
        team on Slack.
      </Typography>
      <Typography variant={'body2'}>Version: {version}</Typography>
      <Typography variant={'body2'}>Github: {repository}</Typography>
    </VStack>
  );
}
