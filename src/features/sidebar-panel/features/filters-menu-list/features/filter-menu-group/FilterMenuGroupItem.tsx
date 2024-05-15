import TelemetryFilter from '@classes/TelemetryFilter.ts';
import TelemetryFilterItem from '@classes/TelemetryFilterItem.ts';
import BaseTag from '@common/event-tag/parts/BaseTag.tsx';
import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import SelectionMenuItem from '@features/sidebar-panel/features/SelectionMenuItem.tsx';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function FilterMenuGroupItem({
  filter,
  filterItem,
  onClick,
  onAltClick,
}: {
  filter: TelemetryFilter;
  filterItem: TelemetryFilterItem;
  onClick: (filterItem: TelemetryFilterItem) => void;
  onAltClick?: (filterItem: TelemetryFilterItem) => void;
}) {
  const { tagConfigs } = useSettingsStore((state) => state);

  const renderItemBody = (filterType: string, filterItem: TelemetryFilterItem) => {
    if (filterType === 'tvTags') {
      const tagConfig = tagConfigs.find((tag) => tag.key === filterItem.value);
      if (!tagConfig) return null;
      const count = filterItem.count;
      const color = tagConfig.themeColor ?? 'appSlate';
      const fontSize = '0.8em';
      return (
        <HStack hFill spaceBetween>
          <BaseTag
            icon={tagConfig.icon}
            label={tagConfig.key}
            themeColorName={tagConfig.themeColor ?? 'appSlate'}
          />
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
      );
    }
    return null;
  };

  const filterType = filter.type as string;

  return (
    <SelectionMenuItem
      key={`${filterType}-${filterItem.value}`}
      title={filterItem.value}
      active={filterItem.active}
      count={filterItem.count}
      onClick={() => onClick(filterItem)}
      onAltClick={() => (onAltClick ? onAltClick(filterItem) : onClick(filterItem))}
    >
      {renderItemBody(filterType, filterItem)}
    </SelectionMenuItem>
  );
}
