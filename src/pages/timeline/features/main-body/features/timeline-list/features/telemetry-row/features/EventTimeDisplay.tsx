import TWEvent from '@classes/data/TWEvent.ts';
import { HStack } from '@common/mui-stacks.tsx';
import useIsSelectedEvent from '@hooks/useIsSelectedEvent.ts';
import { Typography } from '@mui/material';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import formatMsToHms from '@utils/formatMsToHms.ts';

export default function EventTimeDisplay({ event }: { event: TWEvent }) {
  const shouldShowTime = useSettingsStore((state) => state.shouldShowTime);
  const isSelected = useIsSelectedEvent({ event });
  if (!shouldShowTime) return null;
  return (
    <HStack>
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          fontSize: '0.75em',
          color: isSelected ? 'fg15.main' : 'fg35.main',
        }}
      >
        {formatMsToHms(event.twEventTimeMs)}
      </Typography>
    </HStack>
  );
}
