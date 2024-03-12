import AppLayoutDoubleDrawer from '@components/app-layouts/AppLayoutDoubleDrawer.tsx';
import TelemetryLeftDrawer from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryLeftDrawer.tsx';
import TelemetryMainBody from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryMainBody.tsx';
import TelemetryRightDrawer from '@pages/telemetry-viewer-page/features/app-layout-parts/TelemetryRightDrawer.tsx';
import { useEffect, useRef } from 'react';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryViewerPage() {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [setAppBarHeight] = useTelemetryStore((state) => [
    state.setAppBarHeight,
  ]);

  useEffect(() => {
    // Measure the AppBar height and update state
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.clientHeight! as number);
    }
  }, []);
  return (
    <AppLayoutDoubleDrawer
      leftDrawerContent={<TelemetryLeftDrawer />}
      rightDrawerContent={<TelemetryRightDrawer />}
      mainContent={<TelemetryMainBody />}
      appBarRef={appBarRef}
    />
  );
}
