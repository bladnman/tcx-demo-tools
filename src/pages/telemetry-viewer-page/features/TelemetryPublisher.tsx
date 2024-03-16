import { HStack } from '../../../common/mui-stacks.tsx';
import TelemetryEvents from '@pages/telemetry-viewer-page/data/client-telemetry-gh-03.ts';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import { useCallback, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryPublisher() {
  const { addEvents } = useTelemetryStore();
  const eventsToPublish = useMemo(() => [...TelemetryEvents], []);
  const onData = useCallback(
    (data: TelemetryEventMessage) => {
      addEvents([data]);
    },
    [addEvents],
  );

  const publisher = useTCxMockPublisher<TelemetryEventMessage>(
    onData,
    1000,
    eventsToPublish,
  );

  // QUICKLY PUBLISH SOME FOR EXAMPLE
  useEffect(() => {
    publisher.publishNext();
    publisher.publishNext();
    publisher.publishNext();
    publisher.publishNext();
    publisher.publishNext();
    publisher.publishNext();
  }, [publisher]);

  return (
    <HStack>
      <Button variant={'contained'} onClick={() => publisher.publishNext()}>
        Publish
      </Button>
    </HStack>
  );
}
