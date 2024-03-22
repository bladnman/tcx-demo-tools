import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';

export default function getDisplayableEvents(
  events: TVEvent[],
  filters: TelemetryFilter[],
): TVEvent[] {
  return applyFilters(events, filters);
}
