import { useState, useEffect, useCallback, useMemo } from 'react';
import { PeerOptions } from 'peerjs';
import TCx from '@tcx-hosted/tcx/TCx.ts';

type UseTCxProps = {
  /**
   * The name of the TCx.
   *
   * This is "your name" in the context of the TCx. There
   * is another name, "connectToTCxName", which is the name
   * of the TCx you want to connect to.
   */
  tcxName: string;
  /**
   * The name of the TCx you want to connect to.
   */
  connectToTCxName?: string;
  /**
   * The function to call when data is received.
   *
   * The "any" type is used here because the data can be
   * anything. It is up to the developer to know what data
   * is being sent and received. Implementation-specific.
   */
  onData?: (data: never) => void;
  options?: PeerOptions;
};
export type TCxState = {
  tcxName: string;
  connectedToTCxName?: string;
  isRegistered: boolean;
  isConnected: boolean;
};
export type TCxData = {
  tcxState: TCxState;
  tcx: TCx;
};

/**
 * useTCx
 * A hook to manage a TCx instance. This
 * hook is used to create a TCx instance and listen
 * for changes to the TCx state.
 *
 * The response from this hook is the TCx instance itself,
 * which would be enough. But, we also return the TCx state
 * so that the consuming component can react to changes in
 * the TCx state.
 *
 * To use this hook you must provide a "tcxName". This is the
 * name that the TCx will use to identify itself with the peer
 * server. It is also the name that other TCx instances will use
 * to connect to this TCx.
 *
 * @param tcxName
 * @param connectToTCxName
 * @param onData
 * @param options
 */
export default function useTCx({
  tcxName,
  connectToTCxName,
  onData,
  options,
}: UseTCxProps): TCxData {
  const [tcxState, setTcxState] = useState<TCxState>({
    tcxName: '',
    connectedToTCxName: '',
    isRegistered: false,
    isConnected: false,
  });

  /**
   * STATE HANDLER
   * update our state with the new TCx state values
   * this allows for reactive use of the TCx state
   */
  const handleStateChange = useCallback((tcx: TCx) => {
    const newState = {
      tcxName: tcx.name,
      connectedToTCxName: tcx.connectedToName,
      isRegistered: tcx.isRegistered,
      isConnected: tcx.isConnected,
    };
    setTcxState((prevState: any) => ({ ...prevState, ...newState }));
  }, []);

  /**
   * TCx
   * This creates a new TCx instance and sets up the state handler
   * it also
   *  */
  const [tcx, setTCx] = useState<TCx>(() => {
    return new TCx(
      tcxName,
      handleStateChange,
      onData,
      connectToTCxName,
      options,
    );
  });

  /**
   * TCx SETUP CHANGES
   * handle changes to any of the names or data handlers
   * this may require us to create a new TCx instance
   * this also handles CONNECTION to a peer if the connectToTCxName changes
   */
  useEffect(() => {
    const notAChange =
      tcxName === tcx?.name &&
      connectToTCxName === tcx?.connectedToName &&
      onData === tcx?.onData &&
      handleStateChange === tcx?.onStateChange;

    // bail - if nothing has changed, we don't need to do anything
    if (notAChange) return;

    // NAME CHANGED
    if (tcxName !== tcx?.name) {
      // if the name changes, we need to disconnect from the old peer
      tcx?.destroy();

      // and we need to create a whole new TCx instance
      setTCx(
        new TCx(tcxName, handleStateChange, onData, connectToTCxName, options),
      );
    }

    // CONNECT-TO-NAME CHANGED
    else if (connectToTCxName && connectToTCxName !== tcx?.connectedToName) {
      tcx.connectTo(connectToTCxName);
    }

    // DATA HANDLER CHANGES
    else {
      tcx.onStateChange = handleStateChange;
      tcx.onData = onData;
    }
  }, [tcx, tcxName, handleStateChange, connectToTCxName, onData]);

  /**
   * CLEANUP
   * we want to destroy the TCx instance when this hook is unmounted
   * or there is a new tcx instance (due to a name change)
   * */
  useEffect(() => {
    return () => tcx.destroy();
  }, [tcx]);

  return useMemo<TCxData>(() => {
    return {
      tcxState,
      tcx,
    };
  }, [tcxState, tcx]);
}
