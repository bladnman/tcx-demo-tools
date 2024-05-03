import { StackProps, VStack } from '@common/mui-stacks.tsx';
import { SxProps, Typography } from '@mui/material';

export default function SummaryRow({
  label,
  value,
  labelSx = {},
  valueSx = {},
  stackOptions,
}: {
  label: string;
  value: string | number | null | undefined;
  labelSx?: SxProps;
  valueSx?: SxProps;
  stackOptions?: Partial<StackProps>;
}) {
  const valueVariant = value
    ? 'detailSummaryRowValue'
    : 'detailSummaryRowValueEmpty';
  const finalValue = value ? value : value === null ? 'null' : 'undefined';
  return (
    <VStack hFill {...stackOptions}>
      <Typography variant={'detailSummaryRowLabel'} sx={{ pt: 1, ...labelSx }}>
        {label}
      </Typography>
      <Typography variant={valueVariant} sx={{ ...valueSx }}>
        {finalValue}
      </Typography>
    </VStack>
  );
}
