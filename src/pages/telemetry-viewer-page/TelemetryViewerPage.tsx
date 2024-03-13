import AppLayoutDoubleDrawer from '@components/app-layouts/AppLayoutDoubleDrawer.tsx';
import TelemetryLeftDrawer from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryLeftDrawer.tsx';
import TelemetryMainBody from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryMainBody.tsx';
import TelemetryRightDrawer from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryRightDrawer.tsx';
import { useEffect, useRef } from 'react';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { Typography } from '@mui/material';

export default function TelemetryViewerPage() {
  const appBarRef = useRef<HTMLDivElement>(null);
  const { setAppBarHeight, setEventForDetails, eventForDetails } =
    useTelemetryStore();

  useEffect(() => {
    // Measure the AppBar height and update state
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.clientHeight! as number);
    }
  }, [setAppBarHeight]);
  return (
    <AppLayoutDoubleDrawer
      title={<Typography variant={'title'}>Telemetry Viewer</Typography>}
      leftDrawerContent={<TelemetryLeftDrawer />}
      rightDrawerContent={<TelemetryRightDrawer />}
      mainContent={<TelemetryMainBody />}
      appBarRef={appBarRef}
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
