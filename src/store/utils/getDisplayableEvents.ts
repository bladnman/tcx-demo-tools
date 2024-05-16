import TWEvent from '@classes/data/TWEvent.ts';
import applyFilters from '@utils/filter-utils/applyFilters.ts';
import TelemetryFilter from '@classes/TelemetryFilter.ts';

export default function getDisplayableEvents(
  events: TWEvent[],
  filters: TelemetryFilter[],
): TWEvent[] {
  return applyFilters(events, filters);
}
