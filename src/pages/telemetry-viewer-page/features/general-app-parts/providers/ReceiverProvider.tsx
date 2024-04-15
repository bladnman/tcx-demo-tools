import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useCallback, useEffect, useMemo } from 'react';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/telemetry-receiver/TelemetryReceiver.ts';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/mobile_session_full.json';

export default function ReceiverProvider() {
  const { cnxPlatform } = useTelemetryStore();

  if (cnxPlatform === 'Mock') {
    return <MockReceiverProvider />;
  }

  return <StandardReceiverProvider />;
}
function StandardReceiverProvider() {
  // the receiver is the part that receives events and sends them to the store
  useReceiver();
  return null;
}
function MockReceiverProvider() {
  // the store is where events end up
  const { addEvents, connectToTCxName } = useTelemetryStore();

  // the receiver is the part that receives events and sends them to the store
  const receiver = useMemo(() => new TelemetryReceiver(addEvents), [addEvents]);
  const onData = useCallback(
    (events: unknown) => {
      receiver.receiveEvents(events);
    },
    [receiver],
  );

  // create a MOCK PUBLISHER at this time
  // to act like we are getting data sent to us
  const publisher = useTCxMockPublisher<TelemetryDebuggerEvent>(
    onData,
    100,
    telemetryDebuggerEvents,
  );

  useEffect(() => {
    if (connectToTCxName === 'Mock') {
      publisher.start();
    } else {
      publisher.stop();
    }
  }, [publisher, connectToTCxName]);

  return null;
}
