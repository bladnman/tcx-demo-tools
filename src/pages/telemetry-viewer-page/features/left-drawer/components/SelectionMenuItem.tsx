import { HStack } from '@common/mui-stacks.tsx';
import { Radio, Typography } from '@mui/material';

export default function SelectionMenuItem({
  active,
  title,
  count,
  onClick,
}: {
  active: boolean;
  title: string;
  count?: number;
  onClick: () => void;
}) {
  const fontSize = '0.9em';
  const color = active ? 'appOrange' : 'appBg75';
  return (
    <HStack
      hFill
      left
      spacing={1}
      sx={{
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      {/* seemingly incapable of quieting this lint error  */}
      <Radio sx={{ p: 0 }} size={'small'} checked={active} color={color} />
      <HStack hFill spaceBetween>
        <Typography
          fontSize={fontSize}
          fontWeight={active ? 'bold' : 'normal'}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 2em)',
          }}
        >
          {title}
        </Typography>
        {count && (
          <HStack
            sx={{
              borderRadius: '12%',
              minWidth: '1.8em',
              height: '1.5em',
            }}
            color={color}
          >
            <Typography fontSize={fontSize}>{count}</Typography>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
}
