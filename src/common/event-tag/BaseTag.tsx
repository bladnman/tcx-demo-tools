import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function BaseTag({
  themeColorName,
  icon,
  label,
}: {
  themeColorName: string;
  icon: string;
  label: string;
}) {
  const textSx = {
    fontSize: '0.8em',
  };
  const bgColor = themeColorName ? `${themeColorName}.main` : 'transparent';
  const textColor = themeColorName ? `${themeColorName}.contrastText` : 'fg.main';

  return (
    <HStack
      key={label}
      sx={{
        border: '1px solid',
        borderRadius: '0.15em',
        px: '0.5em',
        borderColor: bgColor,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <Typography sx={textSx}>{icon}</Typography>
      <Typography sx={textSx}>{label}</Typography>
    </HStack>
  );
}
