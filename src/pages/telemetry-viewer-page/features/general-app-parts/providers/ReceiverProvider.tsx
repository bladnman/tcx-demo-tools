import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { useCallback, useEffect, useMemo } from 'react';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/telemetry-receiver/TelemetryReceiver.ts';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import telemetryDebuggerEvents from '@pages/telemetry-viewer-page/data/mobile_complete.json';
import actionAddEvents from '@pages/telemetry-viewer-page/store/event-store/actions/actionAddEvents.ts';

export default function ReceiverProvider() {
  const { cnxPlatform } = useSettingsStore();

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
  const { connectToTCxName, mockBatchSize } = useSettingsStore();

  // the receiver is the part that receives events and sends them to the store
  const receiver = useMemo(() => new TelemetryReceiver(actionAddEvents), []);
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
    mockBatchSize ?? 1,
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
