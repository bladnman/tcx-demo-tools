import { useEffect, useMemo } from 'react';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Button, Typography } from '@mui/material';
import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/telemetry_debugger_events_small.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/TelemetryReceiver.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
export default function TelemetryMockPublisherReceiverInterface() {
  // the store is where events end up
  const { addEvents } = useTelemetryStore();

  // the receiver is the part that receives events and sends them to the store
  const receiver = useMemo(() => new TelemetryReceiver(addEvents), [addEvents]);

  // create a MOCK PUBLISHER at this time
  // to act like we are getting data sent to us
  const publisher = useTCxMockPublisher<TelemetryDebuggerEvent>(
    receiver.receiveEvents,
    100,
    telemetryDebuggerEvents,
  );

  return (
    <HStack>
      <Typography>Publisher:</Typography>
      <Button
        variant={'contained'}
        color={'appGreen'}
        onClick={() => publisher.start()}
      >
        <PlayArrowIcon />
      </Button>
      <Button
        variant={'contained'}
        color={'appRed'}
        onClick={() => publisher.stop()}
      >
        <StopIcon />
      </Button>
    </HStack>
  );
}
