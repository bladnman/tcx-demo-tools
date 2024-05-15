import TWEvent from '@classes/data/TWEvent.ts';
import { isObjectWithRequiredKeys } from '@utils/telemetry-utils.ts';

export function isTVEvent(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, ['hasFailures', 'timeMs', 'type']);
}
export default function mapTVEventToTW(event: unknown): TWEvent | null {
  if (!isTVEvent(event)) return null;
  const tvEvent = event as TVEvent;

  const dispatchEvent = tvEvent.dispatchedEvents.reduce((acc, dispatchedEvent) => {
    return { ...acc, ...dispatchedEvent.inputEvent };
  }, {});

  const rawEvent = {
    ...tvEvent.clientEvent,
    ...dispatchEvent,
  };
  const combinedFailures = tvEvent.dispatchedEvents.reduce((acc, dispatchedEvent) => {
    return { ...acc, ...dispatchedEvent.failures };
  }, {});

  const combinedPayloads = tvEvent.dispatchedEvents.reduce((acc, dispatchedEvent) => {
    return { ...acc, ...dispatchedEvent.payloads };
  }, {});

  const combinedFilteredEvents = tvEvent.dispatchedEvents.reduce(
    (acc, dispatchedEvent) => {
      return { ...acc, ...dispatchedEvent.filteredEvent };
    },
    {},
  );

  return new TWEvent({
    twType: tvEvent.type,
    twEventTimeMs: tvEvent.timeMs,
    twId: tvEvent.id,
    rawEvent: rawEvent,

    failures: combinedFailures,
    payloads: combinedPayloads,
    filtered: combinedFilteredEvents,
  });
}
