import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEvents.ts';

export default function ClearButton() {
  return (
    <Button onClick={() => actionSetAllEvents([])} sx={{ flexShrink: 0 }}>
      <DeleteForeverIcon />
    </Button>
  );
}
