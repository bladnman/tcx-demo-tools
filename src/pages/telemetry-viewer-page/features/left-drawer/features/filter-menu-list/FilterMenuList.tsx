import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuGroup from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-menu-list/FilterMenuGroup.tsx';

export default function FilterMenuList() {
  const { filters } = useTelemetryStore();
  return (
    <VStack hFill topLeft spacing={0}>
      {filters.map((filter) => (
        <FilterMenuGroup key={filter.type} filter={filter} />
      ))}
    </VStack>
  );
}
