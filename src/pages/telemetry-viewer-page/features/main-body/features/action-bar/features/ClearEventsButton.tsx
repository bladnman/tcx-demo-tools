import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { actionSetAllEventsAndRecalculateFilters } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import actionClearSequences from '@pages/telemetry-viewer-page/store/event-store/actions/actionClearSequences.ts';

export default function ClearEventsButton() {
  return (
    <Tooltip title="Clear Events">
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => {
          // CLEAR SEQUENCES
          actionClearSequences();
          // CLEAR EVENTS
          actionSetAllEventsAndRecalculateFilters([]);
        }}
        sx={{ mr: 2, width: '1.5em' }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
}
