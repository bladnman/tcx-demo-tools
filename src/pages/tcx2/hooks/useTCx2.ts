import { useMemo, useState } from 'react';
import TCx2 from '@pages/tcx2/classes/TCx2.ts';
import { IWebSocketConstructor } from '@pages/tcx2/classes/TCxSignalServerManager.ts';

const TcxSS_CONFIG = {
  host: 'localhost',
  port: 3000,
  path: '/',
  debug: false,
};
export default function useTCx2(
  name: string,
  onData?: (data: unknown) => void,
) {
  // we want renders to happen when anything within the TCx instance changes
  const [_updateCount, setUpdateCount] = useState(0);

  return useMemo(() => {
    // create a new TCx instance
    const tcx = new TCx2(
      WebSocket as unknown as IWebSocketConstructor,
      RTCPeerConnection as unknown as RTCPeerConnection,
      name,
      () => {
        setUpdateCount((prev) => prev + 1);
      },
      TcxSS_CONFIG,
      onData,
    );

    // register with the signal server
    tcx.register().catch((e) => {
      console.error('Failed to register with signal server', e);
    });
    return tcx;
  }, [onData, name]);
}
