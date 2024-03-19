import { HStack, StackProps } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

interface TelemetryDividerProps extends StackProps {
  field: string;
  value: string;
}
export default function TelemetryDivider(props: TelemetryDividerProps) {
  const { field, value, sx: inSx, ...otherProps } = props;
  return (
    <HStack
      hFill
      spaceBetween
      sx={{
        px: 1,
        pt: 1,
        pb: 1,
        ...inSx,
      }}
      {...otherProps}
      data-id={'telemetry-divider'}
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
