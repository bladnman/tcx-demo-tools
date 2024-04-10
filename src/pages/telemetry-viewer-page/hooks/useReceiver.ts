import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TelemetryReceiver from '@pages/telemetry-viewer-page/classes/telemetry-receiver/TelemetryReceiver.ts';
import { TCxState, useTCx } from '@tcx-hosted/tcx-react';
import { TcxSS_CONFIG } from '@tcx-hosted/tcx-react/hooks/useTCx.ts';

export default function useReceiver() {
  // the store is where events end up
  const {
    addEvents,
    connectToTCxName,
    setConnectedViaTCx,
    setConnectToTCxName,
  } = useTelemetryStore();
  const [tcxName] = useState('TelemetryViewer');

  // we use the receiver to receive events and to clean them up
  // before they are sent to the store
  const receiver = useMemo(() => new TelemetryReceiver(addEvents), [addEvents]);

  const onData = useCallback(
    (events: unknown) => {
      receiver.receiveEvents(events);
    },
    [receiver],
  );
  const onStateChange = useCallback(
    (state: TCxState) => {
      setConnectedViaTCx(state.isConnectedToPeer);
    },
    [setConnectedViaTCx],
  );
  const onConnect = useCallback(() => {
    // noop
  }, []);
  const onDisconnect = useCallback(() => {
    setConnectToTCxName(null);
  }, [setConnectToTCxName]);

  const tcxHandlers = useMemo(() => {
    return {
      onData: onData,
      onStateChange: onStateChange,
      onConnect: onConnect,
      onDisconnect: onDisconnect,
    };
  }, [onData, onStateChange, onConnect, onDisconnect]);

  const tcx = useTCx(tcxName, TcxSS_CONFIG, tcxHandlers);

  useEffect(() => {
    if (connectToTCxName) {
      tcx.connectTo(connectToTCxName).catch((err) => {
        console.error(`❌ Failed to connect to [${connectToTCxName}]`, err);
      });
    } else {
      tcx.disconnect();
    }
  }, [connectToTCxName, tcx]);

  return { receiver, tcx };
}
