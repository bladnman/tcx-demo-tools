import { SxProps, Typography } from '@mui/material';
import { HStack } from '@common/mui-stacks.tsx';

export default function TagBase({
  tagKey,
  tagIcon,
  sx,
  textColor,
  bgColor,
}: {
  tagKey?: string;
  tagIcon?: string;
  sx?: SxProps;
  textColor?: string;
  bgColor?: string;
}) {
  if (!tagKey) return null;
  const borderStyle = {
    borderColor: bgColor ?? 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
  };
  return (
    <HStack
      spacing={1}
      sx={{
        px: 1,
        flexShrink: 0,
        color: textColor,
        background: bgColor,
        ...borderStyle,
        ...sx,
        overflow: 'hidden',
      }}
    >
      <Typography>{tagIcon}</Typography>
      <Typography
        variant={'caption'}
        sx={{
          flexShrink: 0,
          flexGrow: 1,
          fontVariant: 'small-caps',
        }}
      >
        {tagKey}
      </Typography>
    </HStack>
  );
}
