import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { actionRecalculateFilters } from '@pages/telemetry-viewer-page/store/actions/actionRecalculateFilters.ts';

export function actionSetAllEvents({
  state,
  events,
}: StoreAction & { events: TVEvent[] }): Partial<TelemetryStore> {
  const newEvents = [...events];
  let { eventForDetails } = state;

  // CLEAR DETAIL EVENT
  if (!newEvents.find((e) => e.id === state.eventForDetails?.id)) {
    eventForDetails = null;
  }

  return {
    allEvents: newEvents.sort((a, b) => a.timeMs - b.timeMs),
    eventForDetails,

    // REBUILD FILTERS, etc.
    // (filters, displayEvents, filters)
    ...actionRecalculateFilters({ state, events: newEvents }),
  };
}
