import { VStack } from '@common/mui-stacks.tsx';
import DetailsNavStack from '@pages/timeline/features/right-drawer/features/details-nav-stack/DetailsNavStack.tsx';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';

export default function TelemetryRightDrawer() {
  const eventForDetails = useEventForDetails();

  return (
    <VStack fill vAlign={'leading'}>
      {eventForDetails && <DetailsNavStack event={eventForDetails} />}
    </VStack>
  );
}
