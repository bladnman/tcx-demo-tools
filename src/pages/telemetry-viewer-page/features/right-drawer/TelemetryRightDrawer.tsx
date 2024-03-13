import { VStack } from '../../../../common/mui-stacks.tsx';
import TelemetryDetails from '@pages/telemetry-viewer-page/features/right-drawer/features/telemetry-details/TelemetryDetails.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryRightDrawer() {
  const { eventForDetails } = useTelemetryStore();

  return (
    <VStack fill vAlign={'leading'}>
      {eventForDetails && <TelemetryDetails />}
    </VStack>
  );
}
