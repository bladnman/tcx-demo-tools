import { VStack } from '@common/mui-stacks.tsx';
import FilterMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-menu-list/FilterMenuList.tsx';
import FilterActionBar from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-action-bar/FilterActionBar.tsx';
import MenuContainer from '@pages/telemetry-viewer-page/features/left-drawer/components/MenuContainer.tsx';
import DividerMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/divier-menu-list/DividerMenuList.tsx';

export default function TelemetryLeftDrawer() {
  return (
    <VStack
      hAlign={'leading'}
      vAlign={'leading'}
      fill
      sx={{ px: 2, overflow: 'auto' }}
    >
      {/*  FILTERS */}
      <MenuContainer title={'Filters'} actionBar={<FilterActionBar />}>
        <FilterMenuList />
      </MenuContainer>

      {/*  DIVIDERS */}
      <MenuContainer title={'Dividers'}>
        <DividerMenuList />
      </MenuContainer>
    </VStack>
  );
}
