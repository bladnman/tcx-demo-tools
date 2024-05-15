import TelemetryFilter from '@classes/TelemetryFilter.ts';
import useEventStore from '@store/event-store/useEventStore.ts';

export default function populateFiltersWithAllEvents(filters: TelemetryFilter[]) {
  const allEvents = useEventStore.getState().allEvents;
  filters.forEach((filter) => {
    filter.incrementEvents(allEvents);
  });
}
