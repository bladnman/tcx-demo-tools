import useEventStore from '@store/event-store/useEventStore.ts';
import eventMapper from '@classes/telemetry-receiver/eventMapper.ts';
import actionAddEvents from '@store/event-store/actions/actionAddEvents.ts';
import { actionSetSequences } from '@store/event-store/actions/actionSetSequences.ts';

export default function actionAddUnMappedEvents(unmappedEvents: unknown) {
  let rawEvents = unmappedEvents as unknown[];
  if (!Array.isArray(unmappedEvents)) {
    rawEvents = [unmappedEvents];
  }
  if (!rawEvents.length) return;

  const originalSequences = useEventStore.getState().sequences;

  // MAP TO TV EVENTS
  const { events, sequences } = eventMapper(rawEvents, originalSequences);
  if (!events.length) return;

  actionAddEvents(events);

  if (originalSequences !== sequences) {
    actionSetSequences(sequences);
  }
}
