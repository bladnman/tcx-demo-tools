import { VStack } from '@common/mui-stacks.tsx';
import DetailsNavStack from '@pages/telemetry-viewer-page/features/right-drawer/features/details-nav-stack/DetailsNavStack.tsx';
import { useEventForDetails } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function TelemetryRightDrawer() {
  const eventForDetails = useEventForDetails();

  return (
    <VStack fill vAlign={'leading'}>
      {eventForDetails && <DetailsNavStack event={eventForDetails} />}
    </VStack>
  );
}
