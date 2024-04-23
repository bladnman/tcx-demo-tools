import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuGroup from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-menu-list/FilterMenuGroup.tsx';
import { useFilters } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function FilterMenuList() {
  const filters = useFilters();
  return (
    <VStack hFill topLeft spacing={0}>
      {filters.map((filter) => (
        <FilterMenuGroup key={filter.type} filter={filter} />
      ))}
    </VStack>
  );
}
