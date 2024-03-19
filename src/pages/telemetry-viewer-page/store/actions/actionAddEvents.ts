import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts';
import { actionAddEventsToFilters } from '@pages/telemetry-viewer-page/store/actions/actionEventsToFilters.ts';

export function actionAddEvents({
  state,
  events,
}: StoreAction & { events: TelemetryEventMessage[] }): Partial<TelemetryStore> {
  // EXPLODE THE EVENTS (if necessary)
  const explodedEvents = getEventsFromReceivedData(events);

  return {
    // spread whatever this action authors
    // (displayEvents, filters, etc.)
    ...actionAddEventsToFilters({ state, events: explodedEvents }),

    // post the data this action authors
    allEvents: [...state.allEvents, ...explodedEvents],
  };
}
