import TelemetryFilter from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilter.ts';

export default function applyFilters(
  events: TelemetryEventMessage[],
  filters: TelemetryFilter[],
): TelemetryEventMessage[] {
  // no filters -- return all events
  if (filters.length === 0) return events;
  const anyActive = filters.some((filter) => filter.anyActive);
  if (!anyActive) return events;

  return events.filter((event) => {
    return filters.every((filter) => {
      return filter.testForActive(event);
    });
  });
}
