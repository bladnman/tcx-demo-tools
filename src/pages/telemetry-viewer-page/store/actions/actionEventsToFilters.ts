import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';

export function actionAddEventsToFilters({
  state,
  events,
}: StoreAction & { events: TelemetryEventMessage[] }): Partial<TelemetryStore> {
  // let's add the events to the Filter items
  state.filters.forEach((filter) => {
    filter.incrementEvents(events);
  });

  const filteredNewEvents = applyFilters(events, state.filters);
  const newDisplayEvents = [...state.displayEvents, ...filteredNewEvents];
  return {
    // mark filters as dirty
    filters: [...state.filters],
    // splice off if we are over maxEventCount
    displayEvents: newDisplayEvents.splice(0, state.maxEventCount - 1),
  };
}
