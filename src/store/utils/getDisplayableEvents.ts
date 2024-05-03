import applyFilters from '@utils/filter-utils/applyFilters.ts';
import TelemetryFilter from '@classes/TelemetryFilter.ts';

export default function getDisplayableEvents(
  events: TVEvent[],
  filters: TelemetryFilter[],
): TVEvent[] {
  return applyFilters(events, filters);
}
