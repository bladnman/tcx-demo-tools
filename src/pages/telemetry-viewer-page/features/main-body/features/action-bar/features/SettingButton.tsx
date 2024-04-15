import { IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function SettingButton() {
  const { setIsSettingsDialogOpen } = useTelemetryStore();

  return (
    <Tooltip title="Settings">
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => setIsSettingsDialogOpen(true)}
        sx={{ mr: 2, width: '1.5em', flexShrink: 0 }}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
}
