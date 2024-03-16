import getNameForFilterType from '@pages/telemetry-viewer-page/utils/filter-utils/getNameForFilterType.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilter.ts';
import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuItem from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-menu-list/FilterMenuItem.tsx';
import { Typography } from '@mui/material';
import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import TelemetryFilterItem from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilterItem.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useCallback } from 'react';

export default function FilterMenuGroup({
  filter,
}: {
  filter: TelemetryFilter;
}) {
  const { republishFilters } = useTelemetryStore();
  const indentation = '0.4em';
  const renderTitle = () => {
    return (
      <Typography fontFamily={'anton'} fontSize={'1.3em'} fontWeight={'bold'}>
        {getNameForFilterType(filter.type)}
      </Typography>
    );
  };

  const handleFilterItemClick = useCallback(
    (filterItem: TelemetryFilterItem) => {
      filterItem.active = !filterItem.active;
      republishFilters();
    },
    [republishFilters],
  );
  const renderCollapsed = () => {
    const activeItems = filter.items.filter((item) => item.active);
    if (activeItems.length === 0) return null;
    return (
      <VStack topLeft hFill sx={{ pl: indentation }}>
        {activeItems.map((filterItem) => (
          <FilterMenuItem
            key={`${filter.type}-${filterItem.value}`}
            filterItem={filterItem}
            onClick={() => handleFilterItemClick(filterItem)}
          />
        ))}
      </VStack>
    );
  };
  return (
    <VStack topLeft hFill>
      <CollapsibleContainer
        title={renderTitle()}
        collapsedChildren={renderCollapsed()}
        sx={{ width: '100%', userSelect: 'none' }}
      >
        <VStack topLeft hFill sx={{ pl: indentation }}>
          {filter.items.map((filterItem) => (
            <FilterMenuItem
              key={`${filter.type}-${filterItem.value}`}
              filterItem={filterItem}
              onClick={() => handleFilterItemClick(filterItem)}
            />
          ))}
        </VStack>
      </CollapsibleContainer>
    </VStack>
  );
}