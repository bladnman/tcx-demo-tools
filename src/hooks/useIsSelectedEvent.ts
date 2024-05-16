import TWEvent from '@classes/data/TWEvent.ts';
import { useEventForDetails } from '@store/event-store/useEventStore.ts';

export default function useIsSelectedEvent({ event }: { event: TWEvent }) {
  const eventForDetails = useEventForDetails();
  return eventForDetails === event;
}
