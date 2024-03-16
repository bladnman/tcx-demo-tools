import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts';

export function actionAddEvents({
  state,
  events,
}: StoreAction & { events: TelemetryEventMessage[] }): Partial<TelemetryStore> {
  const newSpreadEvents = getEventsFromReceivedData(events); // conditionally explodes the events

  // let's add the events to the Filter items
  state.filters.forEach((filter) => {
    filter.incrementEvents(newSpreadEvents);
  });

  const newFilteredEvents = applyFilters(newSpreadEvents, state.filters);

  const newDisplayEvents = [...state.displayEvents, ...newFilteredEvents];
  return {
    allEvents: [...state.allEvents, ...events],
    // splice off if we are over maxEventCount
    displayEvents: newDisplayEvents.splice(0, state.maxEventCount - 1),
  };
}
