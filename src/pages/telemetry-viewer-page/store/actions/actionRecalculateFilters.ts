import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { actionAddEventsToFilters } from '@pages/telemetry-viewer-page/store/actions/actionEventsToFilters.ts';

export function actionRecalculateFilters({
  state,
  events,
}: StoreAction & { events: TVEvent[] }): Partial<TelemetryStore> {
  //
  // CLEAR FILTERS
  //
  // remove unselected items from filters
  state.filters.forEach((filter) => filter.removeInactiveItems());
  // clear the counts for any selected items
  state.filters.forEach((filter) => filter.clearValues());

  //
  // REBUILD FILTERS
  //

  return {
    filters: [...state.filters],

    // (displayEvents, filters, etc.)
    ...actionAddEventsToFilters({ state, events, displayEvents: [] }),
  };
}
