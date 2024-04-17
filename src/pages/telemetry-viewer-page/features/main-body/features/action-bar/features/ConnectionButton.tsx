import { Button, Tooltip } from '@mui/material';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import actionClearConnectToTCxName from '@pages/telemetry-viewer-page/store/settings-store/actions/actionClearConnectToTCxName.ts';
import actionSetIsSettingsDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
import actionUpdateConnectToTCxName from '@pages/telemetry-viewer-page/store/settings-store/actions/actionUpdateConnectToTCxName.ts';

export default function ConnectionButton({ disabled = false }: { disabled?: boolean }) {
  const { isConnectedViaTCx, connectToTCxName, cnxPlatform } = useSettingsStore();

  const isConnected = isConnectedViaTCx || connectToTCxName === 'Mock';
  const buttonIcon = isConnected ? <StopIcon /> : <PlayArrowIcon />;
  const buttonColor = isConnected ? 'appRed' : 'appGreen';

  const handlePress = () => {
    // DISCONNECTION
    if (isConnected) {
      actionClearConnectToTCxName();
    }

    // CONNECTION
    else {
      // SHOW SETTINGS DIALOG
      if (!cnxPlatform) {
        actionSetIsSettingsDialogOpen(true);
      }

      // RECONNECT
      else {
        actionUpdateConnectToTCxName();
      }
    }
  };

  return (
    <Tooltip title={isConnected ? 'Disconnect' : 'Connect'}>
      <Button
        disabled={disabled}
        onClick={handlePress}
        variant={'contained'}
        // @ts-expect-error : using my own colors
        color={buttonColor}
      >
        {buttonIcon}
      </Button>
    </Tooltip>
  );
}
