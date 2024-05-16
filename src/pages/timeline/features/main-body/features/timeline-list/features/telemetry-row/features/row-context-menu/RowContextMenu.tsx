import TWEvent from '@classes/data/TWEvent.ts';
import { bindMenu, PopupState } from 'material-ui-popup-state/hooks';
import { ListSubheader, Menu, Typography } from '@mui/material';
import ContextMenuItem from '@common/context-menu/ContextMenuItem.tsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { HStack } from '@common/mui-stacks.tsx';
import actionDeleteAllEventsAfter from '@store/event-store/actions/actionDeleteAllEventsAfter.ts';
import actionDeleteAllEventsBefore from '@store/event-store/actions/actionDeleteAllEventsBefore.ts';
type ContextMenuProps = {
  event?: TWEvent | null;
  popupState: PopupState;
};
export default function RowContextMenu({ event, popupState }: ContextMenuProps) {
  if (!event) return null;
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
          actionDeleteAllEventsBefore(event);
          popupState.close();
        }}
      />
      <ContextMenuItem
        label={'Delete after'}
        icon={<ArrowDownwardIcon />}
        onClick={() => {
          actionDeleteAllEventsAfter(event);
          popupState.close();
        }}
      />
    </Menu>
  );
}
