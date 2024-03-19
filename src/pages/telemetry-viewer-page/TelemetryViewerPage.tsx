import AppLayoutDoubleDrawer from '../../common/app-layouts/AppLayoutDoubleDrawer.tsx';
import TelemetryLeftDrawer from '@pages/telemetry-viewer-page/features/left-drawer/TelemetryLeftDrawer.tsx';
import TelemetryMainBody from '@pages/telemetry-viewer-page/features/main-body/TelemetryMainBody.tsx';
import TelemetryRightDrawer from '@pages/telemetry-viewer-page/features/right-drawer/TelemetryRightDrawer.tsx';
import { useEffect, useRef } from 'react';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { Typography } from '@mui/material';

export default function TelemetryViewerPage() {
  const appBarRef = useRef<HTMLDivElement>(null);
  const {
    setAppBarHeight,
    setEventForDetails,
    eventForDetails,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
  } = useTelemetryStore();

  useEffect(() => {
    // Measure the AppBar height and update state
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.clientHeight! as number);
    }
  }, [setAppBarHeight]);
  return (
    <AppLayoutDoubleDrawer
      title={<Typography variant={'title'}>Telemetry Viewer</Typography>}
      mainContent={<TelemetryMainBody />}
      appBarRef={appBarRef}
      leftDrawerContent={<TelemetryLeftDrawer />}
      leftDrawerWidth={400}
      isLeftDrawerOpen={isFilterDrawerOpen}
      onLeftDrawerToggle={(isOpen) => {
        setIsFilterDrawerOpen(isOpen);
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
          setEventForDetails(null);
        }
      }}
    />
  );
}
