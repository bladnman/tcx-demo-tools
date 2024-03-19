import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';

export default function getDisplayableEvents(
  events: TelemetryEventMessage[],
  filters: TelemetryFilter[],
): TelemetryEventMessage[] {
  return applyFilters(getEventsFromReceivedData(events), filters);
}
