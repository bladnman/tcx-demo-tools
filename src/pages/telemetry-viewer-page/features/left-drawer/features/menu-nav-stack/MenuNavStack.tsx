import React from 'react';
import { VStack } from '@common/mui-stacks.tsx';
import { Tab, Tabs } from '@mui/material';
import MenuContainer from '@pages/telemetry-viewer-page/features/left-drawer/components/MenuContainer.tsx';
import FilterActionBar from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-action-bar/FilterActionBar.tsx';
import FilterMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-menu-list/FilterMenuList.tsx';
import DividerMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/dividers-menu-list/DividerMenuList.tsx';
import Icon from '@mdi/react';
import { mdiFilterVariant, mdiTelevisionGuide } from '@mdi/js';
import TagsDisplayList from '@pages/telemetry-viewer-page/features/left-drawer/features/tags-display-list/TagsDisplayList.tsx';

export default function MenuNavStack() {
  const [value, setValue] = React.useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isFilterTab = value === 0;
  const isDisplayTab = value === 1;

  return (
    <VStack fill spacing={2}>
      <Tabs value={value} onChange={handleChange} sx={{ flexShrink: 0 }}>
        <Tab icon={<Icon path={mdiFilterVariant} size={1} />} label="FILTERS" />
        <Tab icon={<Icon path={mdiTelevisionGuide} size={1} />} label="DISPLAY" />
      </Tabs>
      <VStack hAlign={'leading'} vAlign={'leading'} fill sx={{ px: 2, overflow: 'auto' }}>
        {/*  FILTERS */}
        {isFilterTab && (
          <MenuContainer title={'Filters'} actionBar={<FilterActionBar />}>
            <FilterMenuList />
          </MenuContainer>
        )}

        {/*  DISPLAY */}
        {isDisplayTab && (
          <>
            <MenuContainer title={'Dividers'}>
              <DividerMenuList />
            </MenuContainer>
            <MenuContainer title={'Tags'}>
              <TagsDisplayList />
            </MenuContainer>
          </>
        )}
      </VStack>
    </VStack>
  );
}
