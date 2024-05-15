import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { HStack } from '@common/mui-stacks.tsx';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { Typography } from '@mui/material';
import actionRepublishFilters from '@store/event-store/actions/actionRepublishFilters.ts';

export default function FilterInvertButton({
  filter,
  includeIcon = true,
  includeLabel = false,
}: {
  filter: TelemetryFilter;
  includeIcon?: boolean;
  includeLabel?: boolean;
}) {
  const clear = () => {
    if (!filter.anyActive) return;
    // toggle all items
    filter.items.forEach((item) => {
      item.active = !item.active;
    });
    actionRepublishFilters();
  };

  return (
    <HStack
      sx={{
        cursor: 'pointer',
        opacity: filter.anyActive ? 1 : 0,
      }}
      onClick={(evt) => {
        evt.stopPropagation();
        clear();
      }}
    >
      {includeIcon && (
        <SwapCallsIcon
          sx={{
            fontSize: '1.3em',
            cursor: 'pointer',
          }}
        />
      )}
      {includeLabel && <Typography variant={'caption'}>invert</Typography>}
    </HStack>
  );
}
