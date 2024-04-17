import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEvents.ts';

export default function ClearEventsButton() {
  return (
    <Tooltip title="Clear Events">
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => {
          actionSetAllEvents([]);
        }}
        sx={{ mr: 2, width: '1.5em' }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
}
