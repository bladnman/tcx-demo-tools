import { HStack } from '@common/mui-stacks.tsx';
import { Radio, Tooltip, Typography } from '@mui/material';

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
      data-id={'selection-menu-item'}
    >
      <Radio
        sx={{ p: 0 }}
        size={'small'}
        checked={active}
        // @ts-expect-error : using my own colors
        color={color}
      />
      {/* - 2.5em is related to the amount the items are indented in the menu */}
      <HStack hFill spaceBetween data-id={'selection-menu-metadata'} sx={{ width: 'calc(100% - 2.5em)' }}>
        <Tooltip title={title} placement={'top'} arrow enterDelay={700} enterNextDelay={700}>
          <Typography
            fontSize={fontSize}
            fontWeight={active ? 'bold' : 'normal'}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            data-id={'selection-menu-item-title'}
          >
            {title}
          </Typography>
        </Tooltip>
        {count && (
          <HStack
            data-id={'selection-menu-item-count'}
            sx={{
              borderRadius: '12%',
              minWidth: '1.8em',
              height: '1.5em',
            }}
            color={color}
          >
            <Typography fontSize={fontSize}>{count ?? 0}</Typography>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
}
