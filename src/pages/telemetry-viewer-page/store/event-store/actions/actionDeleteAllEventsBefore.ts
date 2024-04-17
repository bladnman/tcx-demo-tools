import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEvents.ts';

export default function actionDeleteAllEventsBefore(event: TVEvent) {
  const { allEvents } = useEventStore.getState();

  // Filter
  const newEvents = allEvents.filter((e) => e.timeMs >= event.timeMs);

  // NO CHANGE
  if (newEvents.length === allEvents.length) return;

  // SET ALL EVENTS
  actionSetAllEvents(newEvents);
}
