import { useMemo, useState } from 'react';
import TCx from '@tcx-hosted/tcx/TCx.ts';
import { IWebSocketConstructor } from '@tcx-hosted/tcx/TCxSignalServerManager.ts';

export const TcxSS_CONFIG = {
  host: 'localhost',
  port: 3000,
  path: '/',
  debug: false,
};
interface TcxSSConfig {
  host: string;
  port: number;
  path: string;
  debug: boolean;
}

export interface TCxState {
  isConnectedToSignalServer: boolean;
  isConnectedToPeer: boolean;
}
export default function useTCx(
  name: string,
  tcxTssOptions: TcxSSConfig,
  handlers?: {
    onData?: (data: unknown) => void;
    onStateChange?: (state: TCxState) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
  },
) {
  // we want renders to happen when anything within the TCx instance changes
  const [_updateCount, setUpdateCount] = useState(0);

  const { onData, onStateChange, onConnect, onDisconnect } = handlers || {};

  return useMemo(() => {
    // create a new TCx instance
    const tcx = new TCx(
      WebSocket as unknown as IWebSocketConstructor,
      RTCPeerConnection as unknown as TCxRTC.IRTCPeerConnectionConstructor,
      name,
      () => {
        onStateChange?.({
          isConnectedToPeer: tcx.isConnectedToPeer,
          isConnectedToSignalServer: tcx.isConnectedToSignalServer,
        });
        setUpdateCount((prev) => prev + 1);
      },
      tcxTssOptions,
      onData,
    );

    // register with the signal server
    tcx.register().catch((e) => {
      console.error('Failed to register with signal server', e);
    });
    return tcx;
  }, [name, tcxTssOptions, onData, onStateChange, onConnect, onDisconnect]);
}
