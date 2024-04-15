import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { IconButton, Menu, Tooltip } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import ContextMenuItem from '@pages/telemetry-viewer-page/common/context-menu/ContextMenuItem.tsx';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ImportExportButton() {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'import-export-menu',
  });
  const { allEvents, setIsImportDialogOpen, setIsExportDialogOpen } =
    useTelemetryStore();

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
          <ImportExportIcon />
        </IconButton>
      </Tooltip>
      <Menu {...bindMenu(popupState)} sx={{ maxWidth: '45em' }}>
        <ContextMenuItem
          label={'Import'}
          icon={<ArrowUpwardIcon />}
          onClick={() => {
            popupState.close();
            setIsImportDialogOpen(true);
          }}
        />
        <ContextMenuItem
          label={'Export'}
          icon={<ArrowDownwardIcon />}
          disabled={!hasEvents}
          onClick={() => {
            popupState.close();
            setIsExportDialogOpen(true);
          }}
        />
      </Menu>
    </>
  );
}
