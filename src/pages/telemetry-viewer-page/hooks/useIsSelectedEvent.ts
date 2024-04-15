import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function useIsSelectedEvent({ event }: { event: TVEvent }) {
  const { eventForDetails } = useTelemetryStore();
  return eventForDetails === event;
}
