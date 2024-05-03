import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import formatDateString from '@utils//formatDateString.ts';
import useIsSelectedEvent from '@hooks/useIsSelectedEvent.ts';

export default function EventTimeDisplay({ event }: { event: TVEvent }) {
  const shouldShowTime = useSettingsStore((state) => state.shouldShowTime);
  const isSelected = useIsSelectedEvent({ event });
  if (!shouldShowTime) return null;
  return (
    <HStack>
      {/*<Tooltip*/}
      {/*  enterDelay={700}*/}
      {/*  enterNextDelay={700}*/}
      {/*  title={formatDateString(event.timestamp, 'DD MMM, YYYY  |  h:mm:ss.SSS A')}*/}
      {/*>*/}
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          fontSize: '0.75em',
          color: isSelected ? 'fg15.main' : 'fg35.main',
        }}
      >
        {formatDateString(event.timestamp, 'h:mm:ss')}
      </Typography>
      {/*</Tooltip>*/}
    </HStack>
  );
}
