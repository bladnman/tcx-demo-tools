import { VStack } from '@common/mui-stacks.tsx';
import DetailsNavStack from '@features/inspector-panel/features/details-nav-stack/DetailsNavStack.tsx';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';

export default function InspectorPanel() {
  const eventForDetails = useEventForDetails();

  return (
    <VStack fill top>
      {eventForDetails && <DetailsNavStack event={eventForDetails} />}
    </VStack>
  );
}
