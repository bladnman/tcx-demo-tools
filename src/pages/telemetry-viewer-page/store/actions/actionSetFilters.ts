import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';
import getDisplayableEvents from '@pages/telemetry-viewer-page/store/utils/getDisplayableEvents.ts';

export function actionSetFilters({
  state,
  filters,
}: StoreAction & { filters: TelemetryFilter[] }): Partial<TelemetryStore> {
  // since the list of filters has changed,
  // we need to find the 'new' filters and
  // give them all the events -- to update their counts
  const newFilters = filters.filter((newFilter) => {
    // look for not-found field names
    return (
      state.filters.find((oldFilter) => oldFilter.field === newFilter.field) ===
      undefined
    );
  });
  // send allEvents to update counts
  newFilters.forEach((newFilter) => newFilter.incrementEvents(state.allEvents));

  // since we have a change to our filters
  // we need to recalculate our displayEvents
  const displayEvents = getDisplayableEvents(state.allEvents, filters);

  return {
    filters: [...filters],
    displayEvents: [...displayEvents],
  };
}
