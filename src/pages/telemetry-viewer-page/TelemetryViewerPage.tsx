import AppLayoutDoubleDrawer from '../../common/app-layouts/AppLayoutDoubleDrawer.tsx';
import TelemetryLeftDrawer from '@pages/telemetry-viewer-page/features/left-drawer/TelemetryLeftDrawer.tsx';
import TelemetryMainBody from '@pages/telemetry-viewer-page/features/main-body/TelemetryMainBody.tsx';
import TelemetryRightDrawer from '@pages/telemetry-viewer-page/features/right-drawer/TelemetryRightDrawer.tsx';
import { useEffect, useRef } from 'react';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { Typography } from '@mui/material';
import AppArchitectureProvider from '@pages/telemetry-viewer-page/features/general-app-parts/AppArchitectureProvider.tsx';
import AppBarTools from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/AppBarTools.tsx';
import StatusBar from '@pages/telemetry-viewer-page/features/status-bar/StatusBar.tsx';
import actionSetEventForDetailsById from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetEventForDetailsById.ts';
import { useEventForDetails } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionSetIsFilterDrawerOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsFilterDrawerOpen.ts';
import actionSetAppBarHeight from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetAppBarHeight.ts';

export default function TelemetryViewerPage() {
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
        mainContent={<TelemetryMainBody />}
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
        appBarContent={<AppBarTools />}
        statusBarContent={<StatusBar />}
      />
    </AppArchitectureProvider>
  );
}
