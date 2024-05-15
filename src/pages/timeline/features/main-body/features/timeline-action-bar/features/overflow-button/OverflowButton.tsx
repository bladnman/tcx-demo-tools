import ContextMenuItem from '@common/context-menu/ContextMenuItem.tsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider, IconButton, Menu, Tooltip, Typography } from '@mui/material';
import actionClearSequences from '@store/event-store/actions/actionClearSequences.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import actionSetIsExportDialogOpen from '@store/settings-store/actions/actionSetIsExportDialogOpen.ts';
import actionSetIsImportDialogOpen from '@store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import { bindMenu, usePopupState } from 'material-ui-popup-state/hooks';

export default function OverflowButton() {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'import-export-menu',
  });
  // const allEvents = useAllEvents();
  // const hasEvents = allEvents.length > 0;

  const hasEvents = true;

  return (
    <>
      <Tooltip title="Import / Export">
        <IconButton
          color="inherit"
          edge="start"
          onClick={(e) => popupState.open(e)}
          sx={{ mr: 2, width: '1.5em', flexShrink: 0 }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu {...bindMenu(popupState)} sx={{ maxWidth: '45em' }}>
        <ContextMenuItem
          label={'Clear Events'}
          icon={<DeleteForeverIcon />}
          onClick={() => {
            popupState.close();
            // CLEAR SEQUENCES
            actionClearSequences();
            // CLEAR EVENTS
            actionSetAllEventsAndRecalculateFilters([]);
          }}
        />
        <Divider />
        <Typography variant="caption" sx={{ px: 1, color: 'fg50.main' }}>
          File management
        </Typography>
        <ContextMenuItem
          label={'Import'}
          icon={<ArrowUpwardIcon />}
          onClick={() => {
            popupState.close();
            actionSetIsImportDialogOpen(true);
          }}
        />
        <ContextMenuItem
          label={'Export'}
          icon={<ArrowDownwardIcon />}
          disabled={!hasEvents}
          onClick={() => {
            popupState.close();
            actionSetIsExportDialogOpen(true);
          }}
        />
      </Menu>
    </>
  );
}
