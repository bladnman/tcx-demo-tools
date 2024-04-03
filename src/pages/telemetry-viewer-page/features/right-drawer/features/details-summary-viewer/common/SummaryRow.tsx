import { HStack } from '@common/mui-stacks.tsx';
import { SxProps, Typography } from '@mui/material';

export default function SummaryRow({
  label,
  value,
  labelSx = {},
  valueSx = {},
}: {
  label: string;
  value: string;
  labelSx?: SxProps;
  valueSx?: SxProps;
}) {
  return (
    <HStack fill topLeft>
      <Typography
        sx={{ fontSize: 15, color: 'appFg50.main', ...labelSx }}
        color="appFg50.main"
      >
        {label}:
      </Typography>
      <Typography sx={{ ...valueSx }}>{value}</Typography>
    </HStack>
  );
}
