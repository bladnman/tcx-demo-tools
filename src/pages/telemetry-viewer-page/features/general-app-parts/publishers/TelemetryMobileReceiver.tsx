import { HStack } from '@common/mui-stacks.tsx';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import useReceiver from '@pages/telemetry-viewer-page/hooks/useReceiver.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetCnxPlatform from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetCnxPlatform.ts';
import actionUpdateConnectToTCxName from '@pages/telemetry-viewer-page/store/settings-store/actions/actionUpdateConnectToTCxName.ts';
import actionClearConnectToTCxName from '@pages/telemetry-viewer-page/store/settings-store/actions/actionClearConnectToTCxName.ts';
export default function TelemetryMobileReceiver() {
  const { isConnectedViaTCx } = useSettingsStore();

  // the receiver is the part that receives events and sends them to the store
  useReceiver();

  return (
    <HStack>
      {!isConnectedViaTCx && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appGreen'}
          onClick={() => {
            actionSetCnxPlatform('Mobile');
            // giving store time to update before calling this
            setTimeout(() => {
              actionUpdateConnectToTCxName();
            }, 200);
          }}
        >
          <PlayArrowIcon />
        </Button>
      )}
      {isConnectedViaTCx && (
        <Button
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={'appRed'}
          onClick={() => {
            actionClearConnectToTCxName();
          }}
        >
          <StopIcon />
        </Button>
      )}
    </HStack>
  );
}
