import useNamedId from '@hooks/useNamedId';
import useTargetedId from '@hooks/useTargetedId';
import { TCxData, useTCx } from '@tcx-hosted/tcx-react';

import CONST from '../CONST';

/**
 * useAppTCx
 * A hook to manage a TCx instance. This
 * hook is used to create a TCx instance and listen
 * for changes to the TCx state.
 *
 * This is a wrapper around useTCx that allows for
 * the use of named TCx instances. This is an
 * example pattern of how to use environment variables
 * to source the TCx names.
 *
 * @param tcxName
 * @param connectToTCxName
 * @param onData
 */
export default function useAppTCx({
  tcxName,
  connectToTCxName,
  onData,
}: {
  tcxName: string;
  connectToTCxName?: string;
  onData?: (data: never) => void;
}): TCxData {
  /**
   * For this app we are using environment variables
   * to create unique TCx names.
   */
  const finaTCxName = useNamedId(tcxName);
  const finalConnectToTCxName = useTargetedId(connectToTCxName);

  return useTCx({
    tcxName: finaTCxName,
    connectToTCxName: finalConnectToTCxName,
    onData: onData,

    /**
     * Options send in the PeerJS signaling server
     * configuration.
     */
    options: {
      ...CONST.PEER_CONFIG,
      port: parseInt(process.env.REACT_APP_SERVER_PORT ?? '3100'),
    },
  });
}
