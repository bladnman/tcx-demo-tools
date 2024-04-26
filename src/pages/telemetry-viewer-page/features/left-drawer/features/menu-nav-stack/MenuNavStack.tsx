import React, { useRef } from 'react';
import { VStack } from '@common/mui-stacks.tsx';
import { Tab, Tabs, Typography } from '@mui/material';
import MenuContainer from '@pages/telemetry-viewer-page/features/left-drawer/components/MenuContainer.tsx';
import FilterActionBar from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-action-bar/FilterActionBar.tsx';
import FilterMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-menu-list/FilterMenuList.tsx';
import DividerMenuList from '@pages/telemetry-viewer-page/features/left-drawer/features/dividers-menu-list/DividerMenuList.tsx';
import Icon from '@mdi/react';
import { mdiFilterVariant, mdiTelevisionGuide } from '@mdi/js';
import TagsDisplayList from '@pages/telemetry-viewer-page/features/left-drawer/features/tags-display-list/TagsDisplayList.tsx';
import useScrollAwareness from '@pages/telemetry-viewer-page/hooks/useScrollAwareness.ts';
import CONST from '@const/CONST.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function MenuNavStack() {
  const [value, setValue] = React.useState(0);
  const vStackRef = useRef(null);
  const isScrolled = useScrollAwareness(vStackRef);
  const filterMode = useSettingsStore((state) => state.filterMode);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isFilterTab = value === 0;
  const isDisplayTab = value === 1;

  const renderFilterModeInfo = () => {
    if (filterMode === 'AND') return null;
    return (
      <VStack hFill left sx={{ p: 2 }} spacing={1}>
        <Typography variant={'body2'} sx={{ color: 'appOrange.main' }}>
          <i>
            Filters are currently set to <b>OR</b> mode. This means that any event that
            matches any of the filters will be displayed.
          </i>
        </Typography>
        <Typography variant={'body2'}>
          This mode can be confusing when multiple filters are active.
          <b>AND</b> mode is recommended for most use cases.
        </Typography>
      </VStack>
    );
  };

  return (
    <VStack fill top spacing={0}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          width: '100%',
          flexShrink: 0,
          boxShadow: isScrolled ? CONST.SCROLL_DROP_BOX_SHADOW : 'none',
        }}
      >
        <Tab icon={<Icon path={mdiFilterVariant} size={1} />} label="FILTERS" />
        <Tab icon={<Icon path={mdiTelevisionGuide} size={1} />} label="DISPLAY" />
      </Tabs>

      <VStack topLeft fill ref={vStackRef} sx={{ px: 2, pt: 2, overflow: 'auto' }}>
        {/*  FILTERS */}
        {isFilterTab && (
          <MenuContainer title={'Filters'} actionBar={<FilterActionBar />}>
            <VStack hFill left spacing={1}>
              <FilterMenuList />
              {renderFilterModeInfo()}
            </VStack>
          </MenuContainer>
        )}

        {/*  DISPLAY */}
        {isDisplayTab && (
          <>
            <MenuContainer title={'Dividers'}>
              <DividerMenuList />
            </MenuContainer>
            <MenuContainer title={'Tags'}>
              <VStack hFill left spacing={0}>
                <VStack hFill left sx={{ p: 1 }} spacing={0}>
                  <Typography variant={'body2'}>
                    Use this section to add new tags to help make sense of the data.
                    <i>
                      Disabling tags here will prevent them from displaying on matched
                      events.
                    </i>
                  </Typography>
                </VStack>
                <TagsDisplayList />
              </VStack>
            </MenuContainer>
          </>
        )}
      </VStack>
    </VStack>
  );
}
