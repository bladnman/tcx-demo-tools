import { HStack } from '@common/mui-stacks.tsx';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
export default function TelemetryPublisherReceiverInterface() {
  const { isConnectedViaTCx, setConnectToTCxName } = useTelemetryStore();

  // the receiver is the part that receives events and sends them to the store
  useReceiver();

  return (
    <HStack>
      {!isConnectedViaTCx && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appGreen'}
          onClick={() => {
            setConnectToTCxName('TDServer');
          }}
        >
          <PlayArrowIcon />
        </Button>
      )}
      {isConnectedViaTCx && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appRed'}
          onClick={() => {
            setConnectToTCxName(null);
          }}
        >
          <StopIcon />
        </Button>
      )}
    </HStack>
  );
}
