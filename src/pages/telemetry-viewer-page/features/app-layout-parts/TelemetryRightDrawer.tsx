import { VStack } from '@components/mui-stacks.tsx';
import TelemetryDetails from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-details/TelemetryDetails.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryRightDrawer() {
  const { eventForDetails } = useTelemetryStore();

  return (
    <VStack fill vAlign={'leading'}>
      {eventForDetails && <TelemetryDetails />}
    </VStack>
  );
}
