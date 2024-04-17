import { Divider, IconButton, Menu, Tooltip, Typography } from '@mui/material';
import { bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import ContextMenuItem from '@pages/telemetry-viewer-page/common/context-menu/ContextMenuItem.tsx';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAllEvents } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEvents.ts';
import actionSetIsImportDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import actionSetIsExportDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsExportDialogOpen.ts';
import actionSetIsSettingsDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
export default function OverflowButton() {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'import-export-menu',
  });
  const allEvents = useAllEvents();

  const hasEvents = allEvents.length > 0;

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
            actionSetAllEvents([]);
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
        <Divider />
        <ContextMenuItem
          label={'Settings'}
          icon={<SettingsIcon />}
          onClick={() => {
            popupState.close();
            actionSetIsSettingsDialogOpen(true);
          }}
        />
      </Menu>
    </>
  );
}
