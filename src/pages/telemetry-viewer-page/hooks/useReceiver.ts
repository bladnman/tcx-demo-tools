import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useMemo } from 'react';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/TelemetryReceiver.ts';

export default function useReceiver() {
  // the store is where events end up
  const { addEvents } = useTelemetryStore();

  // we use the receiver to receive events and to clean them up
  // before they are sent to the store
  const receiver = useMemo(() => new TelemetryReceiver(addEvents), [addEvents]);

  // TODO: implement a TCx and hook the onData to the receiver's receiveEvents
  //       this may be done here or out in the receiverInterface

  return receiver;
}
