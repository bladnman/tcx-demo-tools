import AppLayoutDoubleDrawer from '@common/app-layouts/AppLayoutDoubleDrawer.tsx';
import AppNavFrame from '@common/app-nav-frame/AppNavFrame.tsx';
import SequencesActionBar from '@pages/sequences/features/action-bar/SequencesActionBar.tsx';
import SequencesLeftDrawer from '@pages/sequences/features/left-drawer/SequencesLeftDrawer.tsx';
import SequencesMainBody from '@pages/sequences/features/main-body/SequencesMainBody.tsx';
import TelemetryRightDrawer from '@pages/timeline/features/right-drawer/TelemetryRightDrawer.tsx';
import StatusBar from '@src/features/status-bar/StatusBar.tsx';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';
import actionSetIsFilterDrawerOpen from '@store/settings-store/actions/actionSetIsFilterDrawerOpen.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useRef } from 'react';

export default function SequencesPage() {
  const appBarRef = useRef<HTMLDivElement>(null);
  const eventForDetails = useEventForDetails();
  const { isFilterDrawerOpen } = useSettingsStore();

  return (
    <AppNavFrame>
      <AppLayoutDoubleDrawer
        mainContent={<SequencesMainBody />}
        appBarRef={appBarRef}
        leftDrawerContent={<SequencesLeftDrawer />}
        leftDrawerWidth={400}
        isLeftDrawerOpen={isFilterDrawerOpen}
        showLeftDrawerIcon={!isFilterDrawerOpen}
        onLeftDrawerToggle={(isOpen) => {
          actionSetIsFilterDrawerOpen(isOpen);
        }}
        rightDrawerContent={<TelemetryRightDrawer />}
        showRightDrawerIcon={false}
        rightDrawerWidth={550}
        isRightDrawerOpen={!!eventForDetails}
        appBarContent={<SequencesActionBar />}
        statusBarContent={<StatusBar />}
      />
    </AppNavFrame>
  );
}
