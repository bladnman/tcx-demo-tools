import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useMemo } from 'react';

export default function useEventsOfType({ type }: { type: string }) {
  const { allEvents } = useTelemetryStore();
  return useMemo(() => {
    return allEvents.filter((event) => event.type === type);
  }, [allEvents, type]);
}
