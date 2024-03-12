import { HStack } from '@components/mui-stacks.tsx';
import TelemetryEvents from '@pages/telemetry-viewer-page/data/client-telemetry-gh-03.ts';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import { useCallback, useMemo } from 'react';
import { Button } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryPublisher() {
  const { addEvent } = useTelemetryStore();
  const eventsToPublish = useMemo(() => [...TelemetryEvents], []);
  const onData = useCallback(
    (data: TelemetryEventMessage) => {
      addEvent(data);
    },
    [addEvent],
  );

  const publisher = useTCxMockPublisher<TelemetryEventMessage>(
    onData,
    1000,
    eventsToPublish,
  );

  return (
    <HStack>
      <Button variant={'contained'} onClick={() => publisher.publishNext()}>
        Publish
      </Button>
    </HStack>
  );
}
