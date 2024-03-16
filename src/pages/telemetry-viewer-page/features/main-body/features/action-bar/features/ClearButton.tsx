import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function ClearButton() {
  const { clearDisplayEvents } = useTelemetryStore();
  return (
    <Button
      // variant="contained"
      // color={'bg'}
      // startIcon={<DeleteForeverIcon />}
      onClick={() => clearDisplayEvents()}
      sx={{ flexShrink: 0 }}
    >
      <DeleteForeverIcon />
    </Button>
  );
}
