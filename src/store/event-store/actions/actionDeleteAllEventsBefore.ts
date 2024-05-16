import TWEvent from '@classes/data/TWEvent.ts';
import useEventStore from '@store/event-store/useEventStore.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';

export default function actionDeleteAllEventsBefore(event: TWEvent) {
  const { allEvents } = useEventStore.getState();

  // Filter
  const newEvents = allEvents.filter((e) => e.twEventTimeMs >= event.twEventTimeMs);

  // NO CHANGE
  if (newEvents.length === allEvents.length) return;

  // SET ALL EVENTS
  actionSetAllEventsAndRecalculateFilters(newEvents);
}
