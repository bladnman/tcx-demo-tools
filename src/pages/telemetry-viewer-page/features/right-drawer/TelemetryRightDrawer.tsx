import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import DetailsNavStack from '@pages/telemetry-viewer-page/features/right-drawer/features/details-nav-stack/DetailsNavStack.tsx';

export default function TelemetryRightDrawer() {
  const { eventForDetails } = useTelemetryStore();

  return (
    <VStack fill vAlign={'leading'}>
      {eventForDetails && <DetailsNavStack event={eventForDetails} />}
    </VStack>
  );
}
