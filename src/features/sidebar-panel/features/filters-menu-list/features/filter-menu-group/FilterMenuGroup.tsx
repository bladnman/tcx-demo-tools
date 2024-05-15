import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import TelemetryFilterItem from '@classes/TelemetryFilterItem.ts';
import FilterClearButton from '@features/sidebar-panel/features/filter-buttons/FilterClearButton.tsx';
import FilterInvertButton from '@features/sidebar-panel/features/filter-buttons/FilterInvertButton.tsx';
import FilterGroupActionBar from '@features/sidebar-panel/features/filters-menu-list/features/filter-group-action-bar/FilterGroupActionBar.tsx';
import FilterMenuGroupItem from '@features/sidebar-panel/features/filters-menu-list/features/filter-menu-group/FilterMenuGroupItem.tsx';
import { useCallback } from 'react';
import actionRepublishFilters from '@store/event-store/actions/actionRepublishFilters.ts';

export default function FilterMenuGroup({ filter }: { filter: TelemetryFilter }) {
  const indentation = '2em';
  const renderTitle = () => {
    return (
      <HStack hFill spaceBetween>
        <Typography
          fontFamily={'anton'}
          fontSize={'0.8em'}
          fontWeight={'bold'}
          sx={{
            color: filter.anyActive ? 'appOrange.main' : 'text.primary',
            textTransform: 'uppercase',
          }}
        >
          {filter.name}
        </Typography>
        {filter.anyActive && (
          <HStack sx={{ opacity: 0.75 }}>
            <FilterInvertButton filter={filter} includeIcon={false} includeLabel={true} />
            <Typography>|</Typography>
            <FilterClearButton filter={filter} includeIcon={false} includeLabel={true} />
          </HStack>
        )}
      </HStack>
    );
  };

  const handleFilterItemClick = useCallback((filterItem: TelemetryFilterItem) => {
    filterItem.active = !filterItem.active;
    actionRepublishFilters();
  }, []);
  const handleFilterItemAltClick = useCallback(() => {
    // toggle all items
    filter.items.forEach((item) => {
      item.active = !item.active;
    });
    actionRepublishFilters();
  }, []);

  const renderCollapsed = () => {
    const activeItems = filter.items.filter((item) => item.active);
    if (activeItems.length === 0) return null;
    return (
      <VStack topLeft hFill sx={{ pl: indentation }}>
        {activeItems.map((filterItem) => renderItem(filterItem))}
      </VStack>
    );
  };
  const renderItem = (filterItem: TelemetryFilterItem) => {
    return (
      <FilterMenuGroupItem
        filter={filter}
        filterItem={filterItem}
        onClick={handleFilterItemClick}
        onAltClick={handleFilterItemAltClick}
        key={filterItem.value}
      />
    );
  };
  return (
    <VStack topLeft hFill>
      <CollapsibleContainer
        title={renderTitle()}
        collapsedChildren={renderCollapsed()}
        collapsed={filter.collapsed}
        sx={{ width: '100%', userSelect: 'none' }}
        onToggleCollapse={(isCollapsed) => {
          filter.collapsed = isCollapsed;
          actionRepublishFilters();
        }}
      >
        <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
          <FilterGroupActionBar filter={filter} />
          {filter.items.length === 0 && (
            <Typography variant={'caption'}>No items</Typography>
          )}
          {filter.items.map((filterItem) => renderItem(filterItem))}
        </VStack>
      </CollapsibleContainer>
    </VStack>
  );
}
