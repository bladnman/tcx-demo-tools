import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function LabelRow({
  label,
  value,
}: {
  label?: string | undefined;
  value: string | undefined;
}) {
  if (!value) return null;
  return (
    <HStack hFill spaceBetween spacing={2}>
      {label && (
        <Typography variant={'caption'} sx={{ color: 'fg50.main' }}>
          {label}
        </Typography>
      )}
      <Typography>{value ?? ''}</Typography>
    </HStack>
  );
}
