import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { actionAddEventsToFilters } from '@pages/telemetry-viewer-page/store/actions/actionEventsToFilters.ts';

export function actionAddEvents({
  state,
  events,
}: StoreAction & {
  events: TVEvent[];
}): Partial<TelemetryStore> {
  return {
    // spread whatever this action authors
    // (displayEvents, filters, etc.)
    ...actionAddEventsToFilters({ state, events }),

    // post the data this action authors
    allEvents: [...state.allEvents, ...events],
  };
}
