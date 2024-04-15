import { bindMenu, PopupState } from 'material-ui-popup-state/hooks';
import { ListSubheader, Menu, Typography } from '@mui/material';
import ContextMenuItem from '@pages/telemetry-viewer-page/common/context-menu/ContextMenuItem.tsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { HStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
type ContextMenuProps = {
  event: TVEvent;
  popupState: PopupState;
};
export default function RowContextMenu({
  event,
  popupState,
}: ContextMenuProps) {
  const { deleteAllEventsBefore, deleteAllEventsAfter } = useTelemetryStore();
  return (
    <Menu {...bindMenu(popupState)} sx={{ maxWidth: '45em' }}>
      <ListSubheader>
        <HStack hFill left sx={{ py: 1 }}>
          <DeleteForeverIcon />
          <Typography>DELETE</Typography>
        </HStack>
      </ListSubheader>
      <ContextMenuItem
        label={'Delete before'}
        icon={<ArrowUpwardIcon />}
        onClick={() => {
          deleteAllEventsBefore(event);
          popupState.close();
        }}
      />
      <ContextMenuItem
        label={'Delete after'}
        icon={<ArrowDownwardIcon />}
        onClick={() => {
          deleteAllEventsAfter(event);
          popupState.close();
        }}
      />
    </Menu>
  );
}
