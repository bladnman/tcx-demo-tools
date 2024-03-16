import TelemetryFilterItem from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilterItem.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Radio, Typography } from '@mui/material';

export default function FilterMenuItem({
  filterItem,
  onClick,
}: {
  filterItem: TelemetryFilterItem;
  onClick: () => void;
}) {
  const color = filterItem.active ? 'appOrange' : 'appBg75';
  return (
    <HStack hFill left spacing={1} sx={{ cursor: 'pointer' }} onClick={onClick}>
      {/* seemingly incapable of quieting this lint error  */}
      <Radio sx={{ p: 0 }} checked={filterItem.active} color={color} />
      <HStack hFill spaceBetween>
        <Typography>{filterItem.value}</Typography>
        <HStack
          sx={{
            borderRadius: '12%',
            minWidth: '1.8em',
            height: '1.5em',
          }}
          color={color}
        >
          <Typography>{filterItem.count}</Typography>
        </HStack>
      </HStack>
    </HStack>
  );
}
