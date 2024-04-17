import { useEventForDetails } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function useIsSelectedEvent({ event }: { event: TVEvent }) {
  const eventForDetails = useEventForDetails();
  return eventForDetails === event;
}
