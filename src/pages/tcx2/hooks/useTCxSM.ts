import TCxSignalServerManager, {
  TCxSSEvents,
} from '@pages/tcx2/classes/TCxSignalServerManager.ts';
import { useMemo, useState } from 'react';

const TcxSS_CONFIG = {
  host: 'localhost',
  port: 3000,
  path: '/',
  debug: false,
};
export default function useTCxSM({ tcxName }: { tcxName: string }) {
  const [_updateCount, setUpdateCount] = useState(0);
  const eventHandlers = useMemo<TCxSSEvents>(() => {
    return {
      onopen: () => {
        console.log(`🌽 [${tcxName}] WebSocket Connected`);
        setUpdateCount((prev) => prev + 1);
      },
      onmessage: (event) => {
        console.log(`🌽 [${tcxName}] Message from server:`, event.data);
      },
      onclose: () => {
        console.log(`🌽 [${tcxName}] WebSocket Disconnected`);
        setUpdateCount((prev) => prev + 1);
      },
      onerror: (error) => {
        console.error(`🌽 [${tcxName}] WebSocket Error:`, error);
      },
    };
  }, [setUpdateCount]);
  return useMemo(() => {
    return new TCxSignalServerManager(tcxName, eventHandlers, TcxSS_CONFIG);
  }, [tcxName, eventHandlers]);
}
