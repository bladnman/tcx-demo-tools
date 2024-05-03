import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import actionSetIsSettingsDialogOpen from '@store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
import actionUpdateConnectToTCxName from '@store/settings-store/actions/actionUpdateConnectToTCxName.ts';
import actionSetMockIsPaused from '@store/settings-store/actions/actionSetMockIsPaused.ts';
import actionClearConnectToTCxName from '@store/settings-store/actions/actionClearConnectToTCxName.ts';
import { useMemo } from 'react';
import { mdiPause, mdiPlay, mdiStepForward, mdiStop } from '@mdi/js';
import { actionSetConnectToTcxName } from '@store/settings-store/actions/actionSetConnectToTcxName.ts';

export default function useConnectButton() {
  const isConnectedViaTCx = useSettingsStore((state) => state.isConnectedViaTCx);
  const connectToTCxName = useSettingsStore((state) => state.connectToTCxName);
  const cnxPlatform = useSettingsStore((state) => state.cnxPlatform);
  const mockAutoPause = useSettingsStore((state) => state.mockAutoPause);
  const mockIsPaused = useSettingsStore((state) => state.mockIsPaused);

  const isConnected = isConnectedViaTCx || connectToTCxName === 'Mock';
  const isMockMode = cnxPlatform === 'Mock';

  const handlePress = useMemo(() => {
    const props = {
      isConnectedViaTCx,
      connectToTCxName,
      cnxPlatform,
      isConnected,
      isMockMode,
      mockIsPaused,
    };
    return isMockMode
      ? getMockConnectButtonHandler(props)
      : getStandardConnectButtonHandler(props);
  }, [
    isConnectedViaTCx,
    connectToTCxName,
    cnxPlatform,
    isConnected,
    isMockMode,
    mockIsPaused,
  ]);

  const { buttonIconPath, buttonColor } = useMemo(() => {
    let buttonIconPath = isConnected ? mdiStop : mdiPlay;
    let buttonColor = isConnected ? 'appRed' : 'appGreen';

    // MOCK MODE - override button icon and color
    if (isMockMode) {
      const iconPathPlay = mockAutoPause ? mdiStepForward : mdiPlay;
      buttonIconPath = !isConnected
        ? // not connected
          iconPathPlay
        : // connected
          mockIsPaused
          ? iconPathPlay
          : mdiPause;

      buttonColor = !isConnected
        ? // not connected
          'appGreenWashed'
        : // connected
          mockIsPaused
          ? mockAutoPause
            ? 'appYellow'
            : 'appGreenWashed'
          : 'appOrange';
    }

    return { buttonIconPath, buttonColor };
  }, [isConnected, isMockMode, mockAutoPause, mockIsPaused]);
  return {
    handlePress,
    buttonIconPath,
    buttonColor,
  };
}

type ConnectButtonHandlerHelperProps = {
  isConnectedViaTCx: boolean;
  connectToTCxName: string | null;
  cnxPlatform: string;
  isConnected: boolean;
  isMockMode: boolean;
  mockIsPaused: boolean;
};

function getStandardConnectButtonHandler(props: ConnectButtonHandlerHelperProps) {
  const { isConnected, cnxPlatform } = props;

  const doConnect = () => {
    // SHOW SETTINGS DIALOG
    if (!cnxPlatform) {
      actionSetIsSettingsDialogOpen(true);
    }

    // RECONNECT
    else {
      actionUpdateConnectToTCxName();
    }
  };
  const doDisconnect = () => {
    actionClearConnectToTCxName();
  };

  return () => {
    if (isConnected) {
      doDisconnect();
    } else {
      doConnect();
    }
  };
}
function getMockConnectButtonHandler(props: ConnectButtonHandlerHelperProps) {
  const { isConnected, cnxPlatform, mockIsPaused } = props;

  const doConnect = () => {
    // SHOW SETTINGS DIALOG
    if (!cnxPlatform) {
      actionSetIsSettingsDialogOpen(true);
    }

    // RECONNECT
    else {
      actionSetConnectToTcxName('Mock');
      actionSetMockIsPaused(false);
    }
  };
  const doDisconnect = () => {
    actionSetMockIsPaused(true);
  };

  return () => {
    if (isConnected && !mockIsPaused) {
      doDisconnect();
    } else {
      doConnect();
    }
  };
}
