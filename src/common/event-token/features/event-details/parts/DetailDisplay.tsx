import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

interface DetailDisplayProps {
  highlight?: string;
  message?: string;
  color?: string;
}
export default function DetailDisplay({ highlight, message, color }: DetailDisplayProps) {
  // const { allowWrap } = useSettingsStore();
  const allowWrap = false;
  const hasValue = (value: string | undefined) => value !== undefined && value !== null;

  const hasHighlight = hasValue(highlight);
  const hasMessage = hasValue(message);

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
        <Typography variant={'tokenDetailHighlight'} color={color} fontSize={'1em'}>
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
