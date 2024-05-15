import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { HStack } from '@common/mui-stacks.tsx';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';
import actionRepublishFilters from '@store/event-store/actions/actionRepublishFilters.ts';

export default function FilterClearButton({
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
    filter.clearActive();
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
        <CancelIcon
          sx={{
            fontSize: '1.3em',
            cursor: 'pointer',
          }}
        />
      )}
      {includeLabel && <Typography variant={'caption'}>clear</Typography>}
    </HStack>
  );
}
