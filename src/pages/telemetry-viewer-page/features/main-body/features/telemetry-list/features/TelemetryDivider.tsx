import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function TelemetryDivider({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  return (
    <HStack
      hFill
      spaceBetween
      sx={{
        px: 1,
        pt: 3,
        pb: 1,
      }}
    >
      <Typography
        variant={'dividerValue'}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'fg50.main',
        }}
      >
        {value}
      </Typography>
      <Typography variant={'dividerField'} sx={{ color: 'fg50.main' }}>
        {field}
      </Typography>
    </HStack>
  );
}
