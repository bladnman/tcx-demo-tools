import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useEffect, useMemo, useState } from 'react';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/TelemetryReceiver.ts';
import { useTCx } from '@tcx-hosted/tcx-react';
import { TcxSS_CONFIG } from '@tcx-hosted/tcx-react/hooks/useTCx.ts';

export default function useReceiver() {
  // the store is where events end up
  const { addEvents, connectToTCxName } = useTelemetryStore();
  const [tcxName] = useState('TelemetryViewer');

  // we use the receiver to receive events and to clean them up
  // before they are sent to the store
  const receiver = useMemo(() => new TelemetryReceiver(addEvents), [addEvents]);

  // TODO: implement a TCx and hook the onData to the receiver's receiveEvents
  //       this may be done here or out in the receiverInterface
  const tcx = useTCx(tcxName, TcxSS_CONFIG, receiver.receiveEvents);

  useEffect(() => {
    if (connectToTCxName) {
      tcx.connectTo(connectToTCxName).catch((err) => {
        console.error(`❌ Failed to connect to [${connectToTCxName}]`, err);
      });
    } else {
      console.log(`[🐽](useReceiver.ts) no connectToName. TODO: disconnect`); // todo
    }
  }, [connectToTCxName, tcx]);

  return { receiver, tcx };
}
