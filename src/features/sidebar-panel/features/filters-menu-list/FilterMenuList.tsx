import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuGroup from '@features/sidebar-panel/features/filters-menu-list/features/filter-menu-group/FilterMenuGroup.tsx';
import { useFilters } from '@store/event-store/useEventStore.ts';

export default function FilterMenuList() {
  const filters = useFilters();
  return (
    <VStack hFill topLeft spacing={0}>
      {filters.map((filter) => (
        <FilterMenuGroup key={filter.name} filter={filter} />
      ))}
    </VStack>
  );
}
