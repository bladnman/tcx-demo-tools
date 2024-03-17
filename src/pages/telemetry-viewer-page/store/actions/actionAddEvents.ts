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
  const newSpreadEvents = getEventsFromReceivedData(events); // conditionally explodes the events
  const newAllEvents = [...state.allEvents, ...newSpreadEvents];
  return {
    ...actionAddEventsToFilters({ state, events: newSpreadEvents }),
    allEvents: newAllEvents,
  };
}
