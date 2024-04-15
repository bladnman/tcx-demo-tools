import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function ClearEventsButton() {
  const { clearAllEvents } = useTelemetryStore();

  return (
    <Tooltip title="Clear Events">
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => {
          clearAllEvents();
        }}
        sx={{ mr: 2, width: '1.5em' }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
}
