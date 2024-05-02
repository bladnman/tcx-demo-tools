import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';

export default function actionDeleteAllEventsAfter(event: TVEvent) {
  const { allEvents } = useEventStore.getState();

  // Filter
  const newEvents = allEvents.filter((e) => e.timeMs <= event.timeMs);

  // NO CHANGE
  if (newEvents.length === allEvents.length) return;

  // SET ALL EVENTS
  actionSetAllEventsAndRecalculateFilters(newEvents);
}
