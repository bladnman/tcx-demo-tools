import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { actionAddEventsToFilters } from '@pages/telemetry-viewer-page/store/actions/actionEventsToFilters.ts';
import {
  getFailures,
  getPayloads,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export function actionAddEvents({
  state,
  events,
}: StoreAction & {
  events: TVEvent[];
}): Partial<TelemetryStore> {
  // Events can be "updates" to previous
  // events, so we need to merge them and update the original
  // but, we also don't want to add duplicates to the allEvents
  // nor do we want to add duplicates to the filters
  const newEvents = events.filter((event) => {
    const previousEvent = state.allEvents.find((e) => e.id === event.id);
    // EXISTING - update the existing event
    if (previousEvent) {
      previousEvent.dispatchedEvents = previousEvent.dispatchedEvents ?? [];

      // add on any dispatched events
      previousEvent.dispatchedEvents.push(...(event?.dispatchedEvents ?? []));

      previousEvent.hasFailures = !!getFailures(previousEvent.dispatchedEvents);
      previousEvent.hasPayloads = !!getPayloads(previousEvent.dispatchedEvents);

      return false;
    }
    // NEW
    else {
      return true;
    }
  });

  return {
    // spread whatever this action authors
    // (displayEvents, filters, etc.)
    ...actionAddEventsToFilters({
      state,
      events: newEvents,
      displayEvents: state.displayEvents,
    }),

    // post the data this action authors
    allEvents: [...state.allEvents, ...newEvents],
  };
}
