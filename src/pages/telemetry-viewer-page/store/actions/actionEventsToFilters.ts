import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';

export function actionAddEventsToFilters({
  state,
  events,
  displayEvents,
}: StoreAction & {
  events: TVEvent[];
  displayEvents: TVEvent[];
}): Partial<TelemetryStore> {
  // ADD TO EACH FILTER
  state.filters.forEach((filter) => filter.incrementEvents(events));

  // SEE WHICH EVENTS PASS THE FILTERS
  const filteredNewEvents = applyFilters(events, state.filters);

  // ADD PASSES TO DISPLAY EVENTS
  const newDisplayEvents = filteredNewEvents.length
    ? [...displayEvents, ...filteredNewEvents]
    : null;

  return {
    // mark filters as dirty
    filters: [...state.filters],

    // splice off if we are over maxEventCount
    displayEvents: newDisplayEvents
      ? newDisplayEvents.splice(0, state.maxEventCount - 1)
      : displayEvents,
  };
}
