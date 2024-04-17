import { useMemo } from 'react';
import { useAllEvents } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function useEventsOfType({ type }: { type: string }) {
  const allEvents = useAllEvents();
  return useMemo(() => {
    return allEvents.filter((event) => event.type === type);
  }, [allEvents, type]);
}
