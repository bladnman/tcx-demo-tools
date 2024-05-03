import AppLayoutDoubleDrawer from '@common/app-layouts/AppLayoutDoubleDrawer.tsx';
import { Typography } from '@mui/material';
import AppArchitectureProvider from '@common/providers/AppArchitectureProvider.tsx';
import TelemetryLeftDrawer from '@pages/timeline/features/left-drawer/TelemetryLeftDrawer.tsx';
import TimelineActionBarTools from '@pages/timeline/features/main-body/features/timeline-action-bar/TimelineActionBarTools.tsx';
import TimelineMainBody from '@pages/timeline/features/main-body/TimelineMainBody.tsx';
import TelemetryRightDrawer from '@pages/timeline/features/right-drawer/TelemetryRightDrawer.tsx';
import StatusBar from '@src/features/status-bar/StatusBar.tsx';
import actionSetEventForDetailsById from '@store/event-store/actions/actionSetEventForDetailsById.ts';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';
import actionSetAppBarHeight from '@store/settings-store/actions/actionSetAppBarHeight.ts';
import actionSetIsFilterDrawerOpen from '@store/settings-store/actions/actionSetIsFilterDrawerOpen.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useEffect, useRef } from 'react';

export default function TimelinePage() {
  const appBarRef = useRef<HTMLDivElement>(null);
  const eventForDetails = useEventForDetails();
  const { isFilterDrawerOpen } = useSettingsStore();

  useEffect(() => {
    // Measure the AppBar height and update state
    if (appBarRef.current) {
      actionSetAppBarHeight(appBarRef.current.clientHeight! as number);
    }
  }, []);
  return (
    <AppArchitectureProvider>
      <AppLayoutDoubleDrawer
        title={
          <Typography variant={'title'} sx={{ whiteSpace: 'nowrap' }}>
            Telemetry Viewer
          </Typography>
        }
        mainContent={<TimelineMainBody />}
        appBarRef={appBarRef}
        leftDrawerContent={<TelemetryLeftDrawer />}
        leftDrawerWidth={400}
        isLeftDrawerOpen={isFilterDrawerOpen}
        onLeftDrawerToggle={(isOpen) => {
          actionSetIsFilterDrawerOpen(isOpen);
        }}
        rightDrawerContent={<TelemetryRightDrawer />}
        rightDrawerTitle={
          <Typography variant="title" fontSize={'0.8em'}>
            EVENT DETAILS
          </Typography>
        }
        showRightDrawerIcon={false}
        rightDrawerWidth={550}
        isRightDrawerOpen={!!eventForDetails}
        onRightDrawerToggle={(isOpen) => {
          if (!isOpen) {
            actionSetEventForDetailsById(null);
          }
        }}
        appBarContent={<TimelineActionBarTools />}
        statusBarContent={<StatusBar />}
      />
    </AppArchitectureProvider>
  );
}
