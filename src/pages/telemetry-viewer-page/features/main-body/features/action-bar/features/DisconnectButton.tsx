import { IconButton, Tooltip } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function DisconnectButton() {
  const { connectToTCxName, setConnectToTCxName } = useTelemetryStore();

  if (!connectToTCxName) return null;

  return (
    <Tooltip title="Disconnect">
      <IconButton
        // @ts-expect-error : using my own colors. mui you so hard
        color="appBrightRed"
        edge="start"
        onClick={() => setConnectToTCxName(null)}
        sx={{ mr: 2, width: '1.5em' }}
      >
        <DisabledByDefaultIcon />
      </IconButton>
    </Tooltip>
  );
}
