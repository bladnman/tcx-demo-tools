import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function useEventsForDisplay() {
  const { displayEvents, maxDisplayEventCount } = useTelemetryStore();
  return displayEvents.slice(-maxDisplayEventCount);
}
