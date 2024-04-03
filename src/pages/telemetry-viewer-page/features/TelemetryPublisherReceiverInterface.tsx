import { HStack } from '@common/mui-stacks.tsx';
import { Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
export default function TelemetryPublisherReceiverInterface() {
  const { setConnectToTCxName } = useTelemetryStore();

  // the receiver is the part that receives events and sends them to the store
  useReceiver();

  return (
    <HStack>
      <Typography>Publisher:</Typography>
      <Button
        variant={'contained'}
        color={'appGreen'}
        onClick={() => {
          setConnectToTCxName('TDServer');
        }}
      >
        <PlayArrowIcon />
      </Button>
      <Button
        variant={'contained'}
        color={'appRed'}
        onClick={() => {
          setConnectToTCxName(null);
        }}
      >
        <StopIcon />
      </Button>
    </HStack>
  );
}
