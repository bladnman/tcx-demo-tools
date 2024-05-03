import { Tooltip, Typography } from '@mui/material';
import { useAllEvents, useDisplayEvents } from '@store/event-store/useEventStore.ts';

export default function StatusEventTotals() {
  const displayEvents = useDisplayEvents();
  const allEvents = useAllEvents();
  const allTotal = allEvents.length;
  const displayTotal = displayEvents.length;
  const isFiltered = allTotal !== displayTotal;
  const displayTotalText = isFiltered ? `${displayTotal} / ${allTotal}` : `${allTotal}`;
  const displayToolTip = isFiltered
    ? `Showing ${displayTotal} of ${allTotal} events`
    : `Showing ${allTotal} events`;

  return (
    <Tooltip title={displayToolTip}>
      <Typography
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {displayTotalText}
      </Typography>
    </Tooltip>
  );
}
