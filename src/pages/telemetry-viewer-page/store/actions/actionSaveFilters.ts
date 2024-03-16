import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts';

export function actionSaveFilters({
  state,
}: StoreAction): Partial<TelemetryStore> {
  // when filters change we have to "match" the events to the new filters
  const displayEvents = applyFilters(
    getEventsFromReceivedData(state.allEvents), // conditionally explodes the events
    state.filters,
  );

  return {
    filters: [...state.filters],
    displayEvents,
  };
}
