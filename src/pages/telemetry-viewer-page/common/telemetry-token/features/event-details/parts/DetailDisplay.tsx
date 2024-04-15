import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

interface DetailDisplayProps {
  highlight?: string;
  message?: string;
  color?: string;
}
export default function DetailDisplay({
  highlight,
  message,
  color,
}: DetailDisplayProps) {
  const { allowWrap } = useTelemetryStore();

  const hasHighlight = Boolean(highlight);
  const hasMessage = Boolean(message);

  if (!hasHighlight && !hasMessage) {
    return null;
  }

  return (
    <HStack
      data-id={'DetailDisplay'}
      hAlign={'leading'}
      sx={{
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {hasHighlight && (
        <Typography
          variant={'tokenDetailHighlight'}
          color={color}
          fontSize={'1em'}
        >
          {highlight}
        </Typography>
      )}
      {hasMessage && (
        <Typography
          variant={'tokenDetailMessage'}
          sx={{
            whiteSpace: allowWrap ? 'normal' : 'nowrap',
            overflow: 'hidden',
          }}
        >
          {message}
        </Typography>
      )}
    </HStack>
  );
}
