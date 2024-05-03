import useReceiver from '@hooks/useReceiver.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useCallback, useEffect, useMemo } from 'react';
import TelemetryReceiver from '@classes/telemetry-receiver/TelemetryReceiver.ts';
import useTCxMockPublisher from '@tcx-hosted/tcx-react/hooks/useTCxMockPublisher.ts';
import actionAddUnMappedEvents from '@store/event-store/actions/actionAddUnMappedEvents.ts';
// import telemetryDebuggerEvents from '@data/mobile_complete.json';
// import telemetryDebuggerEvents from '@data/event_updates_tiny.json';
// import telemetryDebuggerEvents from '@data/mock_out_of_order__300.json';
// import telemetryDebuggerEvents from '@data/row_duplication_tiny.json';
import telemetryDebuggerEvents from '@data/mock.json';

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
  const { connectToTCxName } = useSettingsStore();

  // the receiver is the part that receives events and sends them to the store
  const receiver = useMemo(() => new TelemetryReceiver(actionAddUnMappedEvents), []);
  const onData = useCallback(
    (events: unknown) => {
      receiver.receiveEvents(events);
    },
    [receiver],
  );

  // create a MOCK PUBLISHER at this time
  // to act like we are getting data sent to us
  const publisher = useTCxMockPublisher(onData, telemetryDebuggerEvents as unknown[]);

  useEffect(() => {
    if (connectToTCxName === 'Mock') {
      publisher.start();
    } else {
      publisher.stop();
    }
  }, [publisher, connectToTCxName]);

  return null;
}
