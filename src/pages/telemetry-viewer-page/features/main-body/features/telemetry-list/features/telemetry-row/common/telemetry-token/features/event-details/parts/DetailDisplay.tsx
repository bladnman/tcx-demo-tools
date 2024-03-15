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

  if (!highlight && !message) {
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
      {highlight && (
        <Typography fontFamily={'anton'} color={color}>
          {highlight}
        </Typography>
      )}
      {message && (
        <Typography
          sx={{
            whiteSpace: allowWrap ? 'normal' : 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'elza-narrow',
            // fontStyle: 'italic',
            fontSize: '0.85em',
          }}
        >
          {message}
        </Typography>
      )}
    </HStack>
  );
}
