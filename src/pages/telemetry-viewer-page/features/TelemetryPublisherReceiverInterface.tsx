import { useCallback, useEffect } from 'react';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Button, Typography } from '@mui/material';
import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/telemetry_debugger_events_small.ts';
// import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/telemetry_debugger_events.ts';
import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
export default function TelemetryPublisherReceiverInterface() {
  // the receiver is the part that receives events and sends them to the store
  const receiver = useReceiver();

  // when a publisher tells us about new data, we pass it to the receiver
  const onPublishedData = useCallback(
    (data: TelemetryDebuggerEvent | TelemetryDebuggerEvent[]) => {
      if (!Array.isArray(data)) data = [data];
      receiver.receiveEvents(data);
    },
    [receiver],
  );

  // create a MOCK PUBLISHER at this time
  // to act like we are getting data sent to us
  const publisher = useTCxMockPublisher<TelemetryDebuggerEvent>(
    onPublishedData,
    100,
    telemetryDebuggerEvents,
  );

  // call start to begin the publishing
  // publisher.start();

  // or, handle it by hand for now
  // QUICKLY PUBLISH SOME FOR EXAMPLE
  useEffect(() => {
    // publisher.start();
    // publisher.publishNext();
    // publisher.publishNext();
    // publisher.publishNext();
    // publisher.publishNext();
    // publisher.publishNext();
    // publisher.publishNext();
  }, [publisher]);

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
