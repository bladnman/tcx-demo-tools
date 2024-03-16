import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-menu-list/FilterMenuList.tsx';

export default function TelemetryLeftDrawer() {
  return (
    <VStack
      hAlign={'leading'}
      vAlign={'leading'}
      fill
      sx={{ px: 2, overflow: 'auto' }}
    >
      <FilterMenuList />
    </VStack>
  );
}
